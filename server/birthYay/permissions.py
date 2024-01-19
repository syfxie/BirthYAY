from rest_framework import permissions


class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow the user themselves.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class IsUserOrAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow users to edit their own profile and give all other users have read permissions.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj == request.user or request.user.is_staff
