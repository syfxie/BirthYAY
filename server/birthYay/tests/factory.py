from faker import Faker as FakerClass
import factory
from django.db.models.signals import post_save
from birthYay.models import CustomUser, Gift, Link
import random

class GiftFactory(factory.django.DjangoModelFactory):
    name = factory.Sequence(lambda n: 'Gift %d' % n)
    price = random.random() * 100
    user = factory.SubFactory('birthYay.tests.factory.CustomUserFactory')
    
    class Meta:
        model = Gift


class LinkFactory(factory.django.DjangoModelFactory):
    url = "www.test.come"
    gift = factory.SubFactory('birthYay.tests.factory.GiftFactory')
    
    class Meta:
        model = Link
    

class CustomUserFactory(factory.django.DjangoModelFactory): 
    username = factory.Sequence(lambda n: 'user%d' % n)
    email = factory.LazyAttribute(lambda obj: '%s@example.com' % obj.username)
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    birthday = factory.Faker('date_of_birth')
    password = factory.django.Password('Testing.123')

    class Meta:
        model = CustomUser

