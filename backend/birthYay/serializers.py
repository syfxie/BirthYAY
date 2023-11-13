from django.core import exceptions
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser, Gift, Link


class CustomUserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'password',
            'username',
            'first_name',
            'last_name',
            'birthday',
            'profile_photo',
            'is_staff',
            'date_joined',
            'updated_at'
        )
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'required': True},
            'password': {'write_only': True},
            'birthday': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'is_staff': {'read_only': True},
            'date_joined': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def validate(self, data):
        user = CustomUser(**data)
        password = data.get('password')
        errors = dict()

        try:
            validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    followers = serializers.HyperlinkedRelatedField(
        many=True, view_name='user-detail', read_only=True)
    following = serializers.HyperlinkedRelatedField(
        many=True, view_name='user-detail', read_only=True)
    gifts_given = serializers.HyperlinkedRelatedField(
        many=True, view_name='gift-detail', read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'birthday',
            'profile_photo',
            'followers',
            'following',
            'gifts_given',
            'is_active',
            'date_joined',
            'updated_at'
        )
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'required': True},
            'birthday': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'date_joined': {'read_only': True},
            'updated_at': {'read_only': True},
        }


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length=128, required=True)
    new_password1 = serializers.CharField(max_length=128, required=True)
    new_password2 = serializers.CharField(max_length=128, required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'new_password1', 'new_password2',)

    def validate(self, data):
        old_password = data.get('old_password')
        new_password1 = data.get('new_password1')
        new_password2 = data.get('new_password2')

        user = self.context.get('request', None).user
        errors = dict()

        if not check_password(old_password, user.password):
            try:
                errors['old_password'].append(f"Incorrect password.")
            except KeyError:
                errors['old_password'] = [f"Incorrect password."]

        if new_password1 != new_password2:
            try:
                errors['new_password2'].append("Passwords must be the same.")
            except KeyError:
                errors['new_password2'] = ["Passwords must be the same."]

        try:
            validate_password(password=new_password1, user=user)
        except exceptions.ValidationError as e:
            try:
                errors['new_password1'] = errors['new_password1'] + \
                    list(e.messages)
            except KeyError:
                errors['new_password1'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(data)


class FollowUserSerializer(serializers.ModelSerializer):
    user_to_follow = serializers.PrimaryKeyRelatedField(
        required=True, queryset=CustomUser.objects.all())

    class Meta:
        model = CustomUser
        fields = ('user_to_follow',)

    def validate(self, data):
        user_to_follow = data.get('user_to_follow')
        user = self.context.get('request', None).user
        errors = dict()

        if user.id == user_to_follow.id:
            errors['user_to_follow'] = ["User cannot follow themselves"]
        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(data)


class GiftSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=CustomUser.objects.all())
    links = serializers.SlugRelatedField(
        many=True, slug_field='url', read_only=True)

    class Meta:
        model = Gift
        fields = (
            'id',
            'name',
            'price',
            'starred',
            'user',
            'receiver',
            'links',
            'created_at',
            'updated_at'
        )
        extra_kwargs = {
            'id': {'read_only': True},
            'name': {'required': True},
            'user': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }


class LinkSerializer(serializers.ModelSerializer):
    gift = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Link
        fields = ('id', 'url', 'gift', 'created_at', 'updated_at')
        extra_kwargs = {
            'id': {'read_only': True},
            'url': {'read_only': False, 'required': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
