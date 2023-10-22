from django.contrib import admin
from .models import User, Gift, Link

class LinkInline(admin.TabularInline):
    model = Link
class GiftInline(admin.TabularInline):
    model = Gift

class FollowerInline(admin.TabularInline):
    model = User.followers.through
    fk_name = "to_user"
    verbose_name = "Follower"
    verbose_name_plural = "Followers"

class FollowingInline(admin.TabularInline):
    model = User.following.through 
    fk_name = "from_user"
    verbose_name = "Following"
    verbose_name_plural = "Followings"
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'birthday')
    inlines = [GiftInline, FollowerInline, FollowingInline]

class GiftAdmin(admin.ModelAdmin):
    inlines = [LinkInline]

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Gift, GiftAdmin)
