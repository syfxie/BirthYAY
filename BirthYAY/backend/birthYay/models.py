from django.db import models
import uuid
import datetime
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_date_in_past(date):
        if date > datetime.date.today:
            raise ValidationError('Birthday must be in the past.')
        
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=254)
    password = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=30)
    birthday = models.DateField(validators=[validate_date_in_past])
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super(User, self).save(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.first_name + self.last_name
    
    
        

