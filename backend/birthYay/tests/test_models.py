import uuid
from django.test import TestCase
from django.db.utils import IntegrityError
from ..models import CustomUser, Gift, Link
from .factory import CustomUserFactory


class CustomUserModelTest(TestCase):
    def setUp(self):
        CustomUserFactory.create(email="testuser@test.com", username="testusername", first_name="Sophie", last_name="Xie")

    def test_customuser_creation(self):
        user = CustomUser.objects.first()
        self.assertTrue(uuid.UUID(str(user.id)))
        self.assertEqual(user.email, "testuser@test.com")
        self.assertEqual(user.username, "testusername")
        self.assertEqual(user.first_name, "Sophie")
        self.assertEqual(user.last_name, "Xie")
        self.assertEqual(user.profile_photo, "../media/images/profile_photos/default-totoro-profile.png")

    def test_customuser_unique_emails(self):
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create(
                email="testuser@test.com", password="Testing.123", username="baduser2",
                first_name="Sophie", last_name="Xie", birthday="2020-01-01",
            )

    def test_customuser_str_method(self):
        user = CustomUser.objects.first()
        self.assertEqual(str(user), f"{user.username} ({user.email})")

    def test_customuser_update(self):
        user = CustomUser.objects.first()
        user.email = "new@test.com"
        user.username = "new"
        user.first_name = "newFirst"
        user.last_name = "newLast"
        user.save()
        self.assertEqual(user.email, "new@test.com")
        self.assertEqual(user.username, "new")
        self.assertEqual(user.first_name, "newFirst")
        self.assertEqual(user.last_name, "newLast")

    def test_custom_user_cannot_edit_id(self):
        user = CustomUser.objects.first()

        with self.assertRaises(IntegrityError):
            user.id = uuid.uuid4()
            user.save()


class GiftModelTest(TestCase):
    def setUp(self):
        CustomUser.objects.create(
            email="test@test.ca",
            password="Testing.123",
            username="testuser",
            first_name="Cindy",
            last_name="Kaling",
            birthday="2020-01-01"
        )
        Gift.objects.create(
            name="Bunny", user=CustomUser.objects.first(), price=25)

    def test_gift_creation(self):
        gift = Gift.objects.get(name="Bunny")
        self.assertTrue(uuid.UUID(str(gift.id)))
        self.assertEqual(gift.name, "Bunny")
        self.assertEqual(gift.user.email, "test@test.ca")
        self.assertEqual(gift.price, 25.00)
        self.assertEqual(gift.starred, False)

    def test_gift_belongs_to_user(self):
        with self.assertRaises(IntegrityError):
            Gift.objects.create(name="Dog")


class LinkModelTest(TestCase):
    def setUp(self):
        CustomUser.objects.create(
            email="test@test.ca",
            password="Testing.123",
            username="testuser",
            first_name="Cindy",
            last_name="Kaling",
            birthday="2020-01-01"
        )
        Gift.objects.create(
            name="Bunny", user=CustomUser.objects.first(), price=25)

    def test_link_creation(self):
        gift = Gift.objects.first()
        link = Link.objects.create(url="www.google.come", gift=gift)
        self.assertEqual(link.url, "www.google.come")
        self.assertEqual(link.gift.id, gift.id)

    def test_link_must_belong_to_gift(self):
        with self.assertRaises(IntegrityError):
            Link.objects.create(url="www.google.come", gift=None)
