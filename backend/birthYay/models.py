import uuid
import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_date_in_past(date):
    if date > datetime.date.today():
        raise ValidationError('Birthday cannot be in the future.')


def validate_positive(num):
    if num < 0:
        raise ValidationError('Value must be positive')


class CustomUserManager(BaseUserManager):
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        # Generate a UUID for the superuser's ID
        extra_fields['id'] = uuid.uuid4()

        return self.create_user(username, email, password, **extra_fields)

        
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=254)
    birthday = models.DateField(validators=[validate_date_in_past], blank=True, null=True)
    profile_photo = models.ImageField(
         upload_to='images/profile_photos', 
         blank=True,
         default='../media/images/profile_photos/default-totoro-profile.png'
    )
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True, default=None, editable=True)
    updated_at = models.DateTimeField(auto_now=True)
    groups = models.ManyToManyField('auth.Group', related_name='custom_users', blank=True, verbose_name=_('groups'))

    objects = CustomUserManager

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(CustomUser, self).save(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
    
class Gift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=254)
    price = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True, validators=[validate_positive])
    starred = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='gifts_given')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='gifts_received', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super(Gift, self).save(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.name

class Link(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField()
    gift = models.ForeignKey(Gift, on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.url
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super(Link, self).save(*args, **kwargs)

class Wishlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, unique=True, related_name='wishlist')    
    message = models.CharField(max_length=254, blank=True, null=True, default='Have a peek!')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return ''
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super(Wishlist, self).save(*args, **kwargs)

class WishlistItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=254)
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super(WishlistItem, self).save(*args, **kwargs)
     