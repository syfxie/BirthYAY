# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from django.urls import reverse
# from django.utils.safestring import mark_safe
# from django.utils.html import format_html
# from django.utils.translation import gettext as _
# from .models import User, Gift, Link, Wishlist, WishlistItem
# from .forms import GiftAdminForm

# # Inlines
# class LinkInline(admin.TabularInline):
#     model = Link
#     fields = ('url',)
# class GiftInline(admin.TabularInline):
#     model = Gift 
#     fk_name = 'user'
#     verbose_name = 'Gift Sent'
#     verbose_name_plural = 'Gifts Sent'
   

# class ReceivedGiftsInline(admin.TabularInline):
#     model = Gift
#     fk_name = 'receiver'
#     verbose_name = 'Gift Received'
#     verbose_name_plural = 'Gifts Received'

# class WishlistItemInline(admin.TabularInline):
#     model = WishlistItem
#     fields = ('name',)
#     verbose_name = 'Item'
#     verbose_name_plural = 'Items'

# class WishlistInline(admin.TabularInline):
#     model = Wishlist

# class FollowerInline(admin.TabularInline):
#     model = User.followers.through
#     fk_name = 'to_user'
#     verbose_name = 'Follower'
#     verbose_name_plural = 'Followers'

# class FollowingInline(admin.TabularInline):
#     model = User.following.through 
#     fk_name = 'from_user'
#     verbose_name = 'Following'
#     verbose_name_plural = 'Followings'

# # Filters
# class MonthFilter(admin.SimpleListFilter):
#     title = 'Birth Month'
#     parameter_name = _('birth_month')

#     def lookups(self, request, model_admin):
#         return (
#             ('1', _('January')),
#             ('2', _('February')),
#             ('3', _('March')),
#             ('4', _('April')),
#             ('5', _('May')),
#             ('6', _('June')),
#             ('7', _('July')),
#             ('8', _('August')),
#             ('9', _('September')),
#             ('10', _('October')),
#             ('11', _('November')),
#             ('12', _('December')),
#         )

#     def queryset(self, request, queryset):
#         if self.value():
#             return queryset.filter(birthday__month=self.value())

# # Admins
# class _UserAdmin(UserAdmin):
#     # fields = [('first_name', 'last_name'), 'email', 'password', 'username', 'birthday', 'profile_photo']
#     readonly_fields = ['uuid', 'updated_at']
#     list_display = ['uuid', 'username', 'get_profile_photo', 'email', 'password', 'first_name', 'last_name', 'birthday', 'updated_at']
#     list_display_links = ['username']
#     list_filter = ['birthday', MonthFilter]
#     inlines = [GiftInline, ReceivedGiftsInline, WishlistInline, FollowerInline, FollowingInline]

#     def get_profile_photo(self, obj):
#         if obj.profile_photo and obj.profile_photo.url:
#             profile_photo_url = obj.profile_photo.url
#         else:
#             profile_photo_url = '/media/images/profile_photos/default-totoro-profile.png'
#         return mark_safe('<img src="%s" width="50" height="50" />' % profile_photo_url) 

#     get_profile_photo.short_description = 'Profile Photo'

# class GiftAdmin(admin.ModelAdmin):
#     form = GiftAdminForm
#     readonly_fields = ['uuid', 'created_at', 'updated_at']
#     list_display = ['uuid', 'name', 'user_link', 'starred', 'created_at', 'updated_at']
#     list_display_links = ['name']
#     list_filter = ['user__email', 'user']
#     inlines = [LinkInline]

#     def user_link(self, obj):
#         url = reverse('admin:auth_user_change', args=[obj.user.uuid])
#         return format_html('<a href="{}">{}</a>', url, obj.user)
    
#     user_link.short_description = 'User'

# class WishlistAdmin(admin.ModelAdmin):
#     readonly_fields = ['uuid', 'created_at', 'updated_at']
#     list_display = ['uuid', 'user', 'message', 'created_at', 'updated_at']
#     list_filter = ['user']
#     fields = ['message', 'user']
#     inlines = [WishlistItemInline]

# # Register your models here.
# admin.site.register(User, _UserAdmin)
# admin.site.register(Gift, GiftAdmin)
# admin.site.register(Wishlist, WishlistAdmin)
