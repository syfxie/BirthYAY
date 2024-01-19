from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.utils.html import format_html
from django.utils.translation import gettext as _
from .models import CustomUser, Gift, Link, Wishlist, WishlistItem
from .forms import CustomUserCreationForm


# Inlines
class LinkInline(admin.TabularInline):
    model = Link
    fields = ('url',)


class GiftInline(admin.TabularInline):
    model = Gift
    fk_name = 'user'
    verbose_name = 'Gift Sent'
    verbose_name_plural = 'Gifts Sent'
   

class ReceivedGiftsInline(admin.TabularInline):
    model = Gift
    fk_name = 'receiver'
    verbose_name = 'Gift Received'
    verbose_name_plural = 'Gifts Received'


class WishlistItemInline(admin.TabularInline):
    model = WishlistItem
    fields = ('name',)
    verbose_name = 'Item'
    verbose_name_plural = 'Items'


class WishlistInline(admin.TabularInline):
    model = Wishlist


class FollowerInline(admin.TabularInline):
    model = CustomUser.followers.through
    fk_name = 'to_customuser'
    verbose_name = 'Follower'
    verbose_name_plural = 'Followers'


class FollowingInline(admin.TabularInline):
    model = CustomUser.following.through 
    fk_name = 'from_customuser'
    verbose_name = 'Following'
    verbose_name_plural = 'Followings'


# Filters
class MonthFilter(admin.SimpleListFilter):
    title = 'Birth Month'
    parameter_name = _('birth_month')

    def lookups(self, request, model_admin):
        return (
            ('1', _('January')),
            ('2', _('February')),
            ('3', _('March')),
            ('4', _('April')),
            ('5', _('May')),
            ('6', _('June')),
            ('7', _('July')),
            ('8', _('August')),
            ('9', _('September')),
            ('10', _('October')),
            ('11', _('November')),
            ('12', _('December')),
        )

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(birthday__month=self.value())


# Admins
class _UserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'birthday', 'profile_photo')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined', 'updated_at')}),
    )
    readonly_fields = ['id', 'last_login', 'date_joined', 'updated_at']
    list_display = ['id', 'username', 'get_profile_photo', 'email', 'password', 'first_name', 'last_name', 'birthday', 'last_login', 'date_joined', 'updated_at', 'is_active', 'is_staff']
    list_display_links = ['username']
    list_filter = [MonthFilter, 'is_active', 'is_staff']
    inlines = [GiftInline, FollowerInline, FollowingInline]

    def get_profile_photo(self, obj):
        if obj.profile_photo and obj.profile_photo.url:
            profile_photo_url = obj.profile_photo.url
        else:
            profile_photo_url = '/media/images/profile_photos/default-totoro-profile.png'
        return mark_safe('<img src="%s" width="50" height="50" />' % profile_photo_url) 

    get_profile_photo.short_description = 'Profile Photo'


class GiftAdmin(admin.ModelAdmin):
    fields = ['name', 'price', 'starred']
    readonly_fields = ['id', 'created_at', 'updated_at']
    list_display = ['id', 'name', 'user_link', 'gift_link', 'starred', 'created_at', 'updated_at']
    list_display_links = ['name']
    list_filter = ['user']
    inlines = [LinkInline]

    def user_link(self, obj):
        url = reverse('admin:birthYay_customuser_change', args=[obj.user.id])
        return format_html('<a href="{}">{}</a>', url, obj.user)
    
    user_link.short_description = 'User'
    
    def gift_link(self, obj):
        # Retrieve the first link associated with the gift
        first_link = obj.link_set.first()

        if first_link:
            return format_html('<a href="{}" target="_blank">{}</a>', first_link.url, first_link.url)
        else:
            return "No links"
    
    gift_link.short_description = 'Link'


class WishlistAdmin(admin.ModelAdmin):
    readonly_fields = ['id', 'created_at', 'updated_at']
    list_display = ['id', 'user', 'message', 'created_at', 'updated_at']
    list_filter = ['user']
    fields = ['message', 'user']
    inlines = [WishlistItemInline]

    def user_link(self, obj):
        url = reverse('admin:birthYay_customuser_change', args=[obj.user.id])
        return format_html('<a href="{}">{}</a>', url, obj.user)
    
    user_link.short_description = 'User'


admin.site.register(CustomUser, _UserAdmin)
admin.site.register(Gift, GiftAdmin)
admin.site.register(Wishlist, WishlistAdmin)
