from datetime import datetime as dt
from django.db.models import F, Value, IntegerField, ExpressionWrapper, Case, When
from django.db.models.functions import ExtractMonth, ExtractDay
from rest_framework import generics, filters, status, mixins, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from .serializers import (CustomUserListSerializer, CustomUserDetailsSerializer, ChangePasswordSerializer,
                          FollowUserSerializer, GiftSerializer, LinkSerializer
                          )
from .models import CustomUser, Gift, Link
from .permissions import IsUser, IsUserOrAdminOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


# Get the current logged in user
@api_view(['GET'])
@permission_classes([AllowAny])
def get_current_user(request):
    try:
        token_key = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        auth_token = Token.objects.get(key=token_key)
        user = CustomUser.objects.get(id=auth_token.user_id)
        data = CustomUserDetailsSerializer(instance=user).data
        return Response(data=data, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)

# Retrieves users ordered by upcoming birthdays
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_upcoming_birthdays(request):
    try:
        following = request.user.following

        if following:
            current_month = dt.now().month
            current_date = dt.now().day

            ordered_following = following.annotate(
                birth_month=ExtractMonth('birthday'),
                birth_day=ExtractDay('birthday')
            ).order_by('birth_month', 'birth_day')

            ordered_following = ordered_following.annotate(
                is_before_current_date=Case(
                    When(birth_month__lt=current_month, then=Value(1)),
                    When(birth_month__lte=current_month,
                        birth_day__lt=current_date, then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            )
            upcoming_this_year = ordered_following.filter(is_before_current_date=0)
            upcoming_next_year = ordered_following.filter(is_before_current_date=1)
            upcoming_this_year_data = CustomUserListSerializer(upcoming_this_year, many=True).data
            upcoming_next_year_data = CustomUserListSerializer(upcoming_next_year, many=True).data
            return Response(data={'this_year': upcoming_this_year_data, 'next_year': upcoming_next_year_data}, status=status.HTTP_200_OK)
        else:
            return Response(data={}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Coudn`t get upcoming birthdays'}, status=status.HTTP_401_UNAUTHORIZED)


# Authenticates a user and returns an authentication token
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        data = {
            'token': token.key,
            'user_id': user.pk
        }
        return Response(data=data, status=status.HTTP_200_OK)


class CustomUserList(generics.ListCreateAPIView):
    serializer_class = CustomUserListSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        queryset = CustomUser.objects.filter(is_active=true)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class CustomUserDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CustomUserDetailsSerializer
    permission_classes = [IsAuthenticated, IsUserOrAdminOrReadOnly]

    def get_queryset(self):
        return CustomUser.objects.filter(is_active=True)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated, IsUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        instance.set_password(serializer.validated_data.get('new_password1'))
        instance.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUserView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = FollowUserSerializer
    permission_classes = [IsAuthenticated, IsUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        following_id = serializer.validated_data.get('following_id')
        following_username = CustomUser.objects.get(id=following_id).username

        try:
            follow_user = CustomUser.objects.get(id=following_id)
            try:
                instance.following.get(id=following_id)
                instance.following.remove(follow_user)
                return Response({'success': f"You have unfollowed {following_username}."}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                instance.following.add(follow_user)
                return Response({'success': f"You are now following {following_username}."}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error': "User does not exist"}, status=status.HTTP_404_NOT_FOUND)


class GiftList(generics.ListCreateAPIView):
    serializer_class = GiftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Gift.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user'] = request.user
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GiftDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GiftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Gift.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LinkViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_gift(self):
        return Gift.objects.get(user=self.request.user, id=self.kwargs['gift_id'])

    def get_queryset(self):
        return Link.objects.filter(gift=self.get_gift())

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['gift'] = self.get_gift()
        self.perform_create(serializer)
        return Response(serializer.data, status.HTTP_201_CREATED)
