import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_date_in_past, validate_positive


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=254)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthday = models.DateField(blank=True, validators=[validate_date_in_past])
    profile_photo = models.ImageField(
        upload_to='images/profile_photos',
        blank=True,
        default='../media/images/profile_photos/default-totoro-profile.png'
    )
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True, default=None, editable=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.username + ' (' + self.email + ')'


class Gift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True, validators=[validate_positive])
    starred = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='gifts_given')
    receiver = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, related_name='gifts_received', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(Gift, self).save(*args, **kwargs)

    def __str__(self) -> str:
        if self.price:
            return self.name + ' $' + str(self.price)
        else:
            return self.name


class Link(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField(blank=False, null=False, editable=False)
    gift = models.ForeignKey(Gift, on_delete=models.CASCADE, related_name='links', editable=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.url

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(Link, self).save(*args, **kwargs)


class Wishlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='wishlist', unique=True, editable=False)
    message = models.CharField(max_length=254, blank=True, default='Have a peek!')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.user}`s Wishlist'

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(Wishlist, self).save(*args, **kwargs)


class WishlistItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=254)
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.id or not uuid.UUID(str(self.id)):
            self.id = uuid.uuid4()
        super(WishlistItem, self).save(*args, **kwargs)
