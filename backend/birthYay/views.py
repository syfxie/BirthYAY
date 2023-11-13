from rest_framework import generics, filters, status, mixins, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (CustomUserListSerializer, CustomUserDetailsSerializer, ChangePasswordSerializer,
                          FollowUserSerializer, GiftSerializer, LinkSerializer
                          )
from .models import CustomUser, Gift, Link
from .permissions import IsUser, IsUserOrAdminOrReadOnly


class CustomUserList(generics.ListCreateAPIView):
    serializer_class = CustomUserListSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        return CustomUser.objects.filter(is_active=True)

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
        user_to_follow = serializer.validated_data.get('user_to_follow')
        user_to_follow_username = CustomUser.objects.get(id=user_to_follow.id).username

        try:
            instance.following.get(id=user_to_follow.id)
            instance.following.remove(user_to_follow)
            return Response({'success': f"You have unfollowed {user_to_follow_username}."}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            instance.following.add(user_to_follow)
            return Response({'success': f"You are now following {user_to_follow_username}."}, status=status.HTTP_200_OK)


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
