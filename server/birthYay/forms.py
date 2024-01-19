from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(max_length=200, required=True, help_text='Required')
    first_name = forms.CharField(max_length=30, required=True, help_text='Required')
    last_name = forms.CharField(max_length=30, required=True, help_text='Required')
    birthday = forms.DateField(input_formats=('%Y/%m/%d', '%d/%m/%Y', '%Y-%m-%d', '%d-%m-%Y'), required=True, help_text='Required')
    profile_photo = forms.ImageField(allow_empty_file=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'birthday', 'profile_photo')


    def __init__(self, *args, **kwargs):
        super(GiftAdminForm, self).__init__(*args, **kwargs)
        if self.instance.id is not None and self.instance.user is not None:
            self.fields['user'].widget.attrs['readonly'] = True

# TODO: Fix User field so that it's read-only
# TODO: Fix link to User page from Gift list.
