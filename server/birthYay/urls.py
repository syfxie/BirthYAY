from django.urls import path
from . import views


urlpatterns = [
    path('users/', views.CustomUserList.as_view(), name='user-list'),
    path('users/<uuid:pk>/', views.CustomUserDetails.as_view(), name='user-detail'),
    path('users/<uuid:pk>/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('users/<uuid:pk>/follow/', views.FollowUserView.as_view(), name='follow-user'),
    path('gifts/', views.GiftList.as_view(), name='gift-list'),
    path('gifts/<uuid:pk>/', views.GiftDetails.as_view(), name='gift-detail'),
    path('get-token/', views.CustomAuthToken.as_view()),
    path('get-current-user/', views.get_current_user, name='get_current_user'),
    path('upcoming-birthdays/', views.get_upcoming_birthdays, name='get_upcoming_birthdays')
]
