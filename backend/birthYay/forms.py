from django.contrib import admin
from .models import User, Gift, Link, Wishlist, WishlistItem
from django import forms

class GiftAdminForm(forms.ModelForm):
    class Meta:
        model = Gift
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(GiftAdminForm, self).__init__(*args, **kwargs)
        if self.instance.id is not None and self.instance.user is not None:
            self.fields['user'].widget.attrs['readonly'] = True

# TODO: Fix User field so that it's read-only
# TODO: Fix link to User page from Gift list.
