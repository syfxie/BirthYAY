from copy import deepcopy
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .factory import CustomUserFactory, GiftFactory, LinkFactory
from ..models import CustomUser, Gift, Link
from .. import helpers


class CustomUserRetrieveTests(APITestCase):
    def setUp(self):
        CustomUserFactory.create_batch(15, password="Testing.123")
        self.user = CustomUser.objects.first()
        self.client.force_authenticate(user=self.user)

    def test_user_list(self):
        url = reverse('user-list')
        response = self.client.get(url)
        response_data = response.data
        expected_user_ids = [str(user.id) for user in CustomUser.objects.all()]
        result_user_ids = [str(user['id'])
                           for user in response_data.get('results')]

        # get the rest of the users from a paginated response
        while response_data.get('next'):
            next_url = response_data.get('next')
            response = self.client.get(next_url)
            result_user_ids += [str(user['id'])
                                for user in response_data.get('results')]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(expected_user_ids), len(result_user_ids))
        self.assertListEqual(expected_user_ids, result_user_ids)

    def test_user_details(self):
        url = reverse('user-detail', kwargs={'pk': self.user.pk})
        response = self.client.get(url)
        response_data = response.data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(self.user.id), response_data.get('id'))
        self.assertEqual(self.user.email, response_data.get('email'))
        self.assertEqual(self.user.username, response_data.get('username'))
        self.assertEqual(self.user.first_name, response_data.get('first_name'))
        self.assertEqual(self.user.last_name, response_data.get('last_name'))
        self.assertEqual(str(self.user.birthday),
                         response_data.get('birthday'))

    def test_user_can_view_other_users(self):
        other_user = CustomUserFactory()
        url = reverse('user-detail', kwargs={'pk': other_user.pk})
        response = self.client.get(url)
        response_data = response.data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(other_user.id), response_data.get('id'))
        self.assertEqual(other_user.email, response_data.get('email'))
        self.assertEqual(other_user.username, response_data.get('username'))
        self.assertEqual(other_user.first_name,
                         response_data.get('first_name'))
        self.assertEqual(other_user.last_name, response_data.get('last_name'))
        self.assertEqual(str(other_user.birthday),
                         response_data.get('birthday'))


class CustomUserCreateTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "username",
                'password': "Testing.123",
                'first_name': "first",
                'last_name': "last",
                'birthday': "2023-01-01"
                }
        response = self.client.post(url, data)
        user = CustomUser.objects.get(id=response.data.get('id'))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.email, data.get('email'))
        self.assertEqual(user.username, data.get('username'))
        self.assertEqual(user.first_name, data.get('first_name'))
        self.assertEqual(user.last_name, data.get('last_name'))
        self.assertEqual(str(user.birthday), data.get('birthday'))
        self.assertTrue(user.check_password(data.get('password')))

    def test_user_must_have_email(self):
        url = reverse('user-list')
        data = {'email': "",
                'username': "username",
                'first_name': "first",
                'last_name': "last",
                'birthday': "2023-01-01"
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_user_must_have_username(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "",
                'first_name': "first",
                'last_name': "last",
                'birthday': "2023-01-01"
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_user_must_have_first_name(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "username",
                'first_name': "",
                'last_name': "last",
                'birthday': "2023-01-01"
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_user_must_have_last_name(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "username",
                'first_name': "first",
                'last_name': "",
                'birthday': "2023-01-01"
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_user_must_have_birthday(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "username",
                'first_name': "first",
                'last_name': "",
                'birthday': ""
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_birthday_must_be_in_past(self):
        url = reverse('user-list')
        data = {'email': "email@gmail.com",
                'username': "username",
                'first_name': "first",
                'last_name': "last",
                'birthday': "2026-01-01"
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)


class CustomUserUpdateTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory(username="testuser")
        self.client.login(username="testuser", password="Testing.123")
        # self.client.force_authenticate(user=self.user)

    def test_full_update(self):
        url = reverse('user-detail', kwargs={'pk': self.user.pk})
        data = {'email': "new_email@gmail.com",
                'username': "new_username",
                'first_name': "new_first",
                'last_name': "new_last",
                'birthday': "2023-01-01"
                }
        response = self.client.put(url, data)
        response_data = response.data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data.get('email'), data.get('email'))
        self.assertEqual(response_data.get('username'), data.get('username'))
        self.assertEqual(response_data.get(
            'first_name'), data.get('first_name'))
        self.assertEqual(response_data.get('last_name'), data.get('last_name'))
        self.assertEqual(str(response_data.get('birthday')),
                         data.get('birthday'))

    def test_partial_update(self):
        url = reverse('user-detail', kwargs={'pk': self.user.pk})
        data = {'first_name': "new_first",
                'last_name': "new_last",
                'birthday': "2023-01-01"
                }
        response = self.client.put(url, data)
        response_data = response.data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data.get(
            'first_name'), data.get('first_name'))
        self.assertEqual(response_data.get('last_name'), data.get('last_name'))
        self.assertEqual(str(response_data.get('birthday')),
                         data.get('birthday'))

    def test_invalid_update_required_fields(self):
        url = reverse('user-detail', kwargs={'pk': self.user.pk})
        data = {'email': "",
                'username': "",
                'first_name': "",
                'last_name': "",
                'birthday': "",
                }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_can_only_update_themselves(self):
        other_user = CustomUserFactory()
        original_user = deepcopy(other_user)
        url = reverse('user-detail', kwargs={'pk': other_user.pk})
        data = {'email': "new_email@gmail.com",
                'username': "new_username",
                }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(other_user, original_user)


class CustomUserDeleteTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)

    def test_users_deactivate_account(self):
        url = reverse('user-detail', kwargs={'pk': self.user.pk})
        response = self.client.delete(url)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.user.is_active)
        self.assertIsNotNone(CustomUser.objects.get(id=self.user.id))

    def test_users_can_only_deactivate_themselves(self):
        other_user = CustomUserFactory()
        url = reverse('user-detail', kwargs={'pk': other_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CustomUserChangePasswordTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)

    def test_password_change(self):
        url = reverse('change-password', kwargs={'pk': self.user.pk})
        data = {'old_password': "Testing.123",
                'new_password1': "Newpassword.123",
                'new_password2': "Newpassword.123"
                }
        response = self.client.put(url, data)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.user.check_password(data.get('new_password1')))

    def test_old_password_must_be_correct(self):
        url = reverse('change-password', kwargs={'pk': self.user.pk})
        data = {'old_password': "Wrong.123",
                'new_password1': "Newpassword.123",
                'new_password2': "Newpassword.123"
                }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_new_passwords_must_match(self):
        url = reverse('change-password', kwargs={'pk': self.user.pk})
        data = {'old_password': "Testing.123",
                'new_password1': "Newpassword.123",
                'new_password2': "Wrong.123"
                }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_complex_new_password(self):
        url = reverse('change-password', kwargs={'pk': self.user.pk})
        data = {'old_password': "Testing.123",
                'new_password1': "1234",
                'new_password2': "1234"
                }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CustomUserFollowUserTests(APITestCase):
    def setUp(self):
        self.user = CustomUserFactory()
        self.other_user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)

    def test_follow_user(self):
        url = reverse('follow-user', kwargs={'pk': self.user.pk})
        data = {'user_to_follow': self.other_user.id}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.following.count(), 1)
        self.assertTrue(self.user.following.filter(
            id=self.other_user.id).exists())
        self.assertEqual(response.data.get('success'),
                         f"You are now following {self.other_user.username}.")

    def test_unfollow_user(self):
        self.user.following.add(self.other_user)
        url = reverse('follow-user', kwargs={'pk': self.user.pk})
        data = {'user_to_follow': self.other_user.id}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.following.count(), 0)
        self.assertFalse(self.user.following.filter(
            id=self.other_user.id).exists())
        self.assertEqual(response.data.get('success'),
                         f"You have unfollowed {self.other_user.username}.")

    def test_cannot_follow_self(self):
        url = reverse('follow-user', kwargs={'pk': self.user.pk})
        data = {'user_to_follow': self.user.id}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.user.following.count(), 0)


class GiftRetrieveTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)
        GiftFactory.create_batch(15, user=self.user)

    def test_list_all_gifts(self):
        url = reverse('gift-list')
        response = self.client.get(url)
        expected_gift_ids = [str(gift.id) for gift in Gift.objects.all()]
        result_gift_ids = [str(gift['id']) for gift in response.data.get('results')]

        # get the rest of the gifts from a paginated response
        while response.data.get('next'):
            next_url = response.data.get('next')
            response = self.client.get(next_url)
            result_gift_ids += [str(gift['id'])
                                for gift in response.data.get('results')]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(expected_gift_ids), len(result_gift_ids))
        self.assertListEqual(expected_gift_ids, result_gift_ids)

    def test_only_list_user_gifts(self):
        GiftFactory.create_batch(2)
        url = reverse('gift-list')
        response = self.client.get(url)
        expected_gift_ids = [str(gift.id)
                             for gift in Gift.objects.filter(user=self.user)]
        result_gift_ids = [str(gift['id'])
                           for gift in response.data.get('results')]

        while response.data.get('next'):
            next_url = response.data.get('next')
            response = self.client.get(next_url)
            result_gift_ids += [str(gift['id'])
                                for gift in response.data.get('results')]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(expected_gift_ids), len(result_gift_ids))
        self.assertListEqual(expected_gift_ids, result_gift_ids)

    def test_get_gift_by_id(self):
        target = Gift.objects.first()
        url = reverse('gift-detail', kwargs={'pk': target.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('id'), str(target.id))

    def test_cannot_retrieve_another_users_gift(self):
        target = GiftFactory()
        url = reverse('gift-detail', kwargs={'pk': target.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class GiftCreateTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)

    def test_create_gift(self):
        url = reverse('gift-list')
        data = {'name': "Test Gift", 'price': 15.35, 'starred': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('name'), data.get('name'))
        self.assertEqual(helpers.round_to_two_decimals(response.data.get(
            'price')), helpers.round_to_two_decimals(data.get('price')))
        self.assertEqual(response.data.get('starred'), data.get('starred'))
        self.assertEqual(response.data.get('user'), self.user.id)

    def test_create_gift_with_receiver(self):
        receiver = CustomUserFactory()
        url = reverse('gift-list')
        data = {'name': "Test Gift", 'price': 15.35,
                'starred': True, 'receiver': receiver.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('name'), data.get('name'))
        self.assertEqual(helpers.round_to_two_decimals(response.data.get(
            'price')), helpers.round_to_two_decimals(data.get('price')))
        self.assertEqual(response.data.get('starred'), data.get('starred'))
        self.assertEqual(response.data.get('user'), self.user.id)
        self.assertEqual(response.data.get('receiver'), receiver.id)

    def test_price_and_starred_optional(self):
        url = reverse('gift-list')
        data = {'name': "Test Gift"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('name'), data.get('name'))
        self.assertEqual(response.data.get('user'), self.user.id)

    def test_gift_must_have_name(self):
        url = reverse('gift-list')
        data = {'price': 15.00, 'starred': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Gift.objects.count(), 0)

    def test_price_positive(self):
        url = reverse('gift-list')
        data = {'name': "Test Gift", 'price': -15.00, 'starred': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Gift.objects.count(), 0)


class GiftUpdateTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)
        self.gift = GiftFactory(user=self.user)

    def test_full_update_gift(self):
        target = self.gift
        receiver = CustomUserFactory()
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'name': "New Gift", 'price': 0.10,
                'starred': True, 'receiver': receiver.id}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(target.name, data.get('name'))
        self.assertEqual(helpers.round_to_two_decimals(
            target.price), helpers.round_to_two_decimals(data.get('price')))
        self.assertEqual(target.starred, data.get('starred'))

    def test_update_gift_name(self):
        target = self.gift
        old_price = target.price
        old_starred = target.starred
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'name': "New Name"}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(helpers.round_to_two_decimals(
            target.price), helpers.round_to_two_decimals(old_price))
        self.assertEqual(target.starred, old_starred)
        self.assertEqual(target.name, data.get('name'))

    def test_update_gift_price(self):
        target = self.gift
        old_name = target.name
        old_starred = target.starred
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'price': 0.10}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(target.name, old_name)
        self.assertEqual(target.starred, old_starred)
        self.assertEqual(helpers.round_to_two_decimals(
            target.price), helpers.round_to_two_decimals(data.get('price')))

    def test_update_gift_starred(self):
        target = self.gift
        old_name = target.name
        old_price = target.price
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'starred': True}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(target.name, old_name)
        self.assertEqual(helpers.round_to_two_decimals(
            target.price), helpers.round_to_two_decimals(old_price))
        self.assertEqual(target.starred, data.get('starred'))

    def test_update_gift_receiver(self):
        target = self.gift
        receiver = CustomUserFactory()
        old_name = target.name
        old_starred = target.starred
        old_price = target.price
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'receiver': receiver.id}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(target.name, old_name)
        self.assertEqual(helpers.round_to_two_decimals(
            target.price), helpers.round_to_two_decimals(old_price))
        self.assertEqual(target.starred, old_starred)
        self.assertEqual(target.receiver, data.get('receiver'))

    def test_new_name_not_empty(self):
        target = self.gift
        old_name = target.name
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'name': ''}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(target.name, old_name)

    def test_cannot_change_user(self):
        other_user = CustomUserFactory()
        target = self.gift
        url = reverse('gift-detail', kwargs={'pk': target.id})
        data = {'user': other_user.id}
        response = self.client.put(url, data)
        target.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(target.user.id, self.user.id)

    def test_cannot_update_another_users_gift(self):
        target = GiftFactory()
        url = reverse('gift-detail', kwargs={'pk': target.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class GiftDeleteTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)

    def test_delete_gift(self):
        target = GiftFactory(user=self.user)
        url = reverse('gift-detail', kwargs={'pk': target.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Gift.DoesNotExist):
            Gift.objects.get(id=target.id)

    def test_gift_not_found(self):
        target = GiftFactory()
        url = reverse('gift-detail', kwargs={'pk': target.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class LinkRetrieveTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.client.force_authenticate(user=self.user)
        self.gift = GiftFactory(user=self.user)
        LinkFactory.create_batch(15, gift=self.gift)

    def test_list_all_links(self):
        url = reverse('gift-link-list', kwargs={'gift_id': self.gift.id})
        response = self.client.get(url)
        expected_link_ids = [str(link.id) for link in Link.objects.all()]
        result_link_ids = [str(link['id'])
                           for link in response.data.get('results')]

        # get the rest of the links from a paginated response
        while response.data.get('next'):
            next_url = response.data.get('next')
            response = self.client.get(next_url)
            result_link_ids += [str(link['id'])
                                for link in response.data.get('results')]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(expected_link_ids), len(result_link_ids))
        self.assertListEqual(expected_link_ids, result_link_ids)

    def test_only_list_current_gifts_links(self):
        LinkFactory.create_batch(2)
        url = reverse('gift-link-list', kwargs={'gift_id': self.gift.id})
        response = self.client.get(url)
        expected_link_ids = [str(link.id)
                             for link in Link.objects.filter(gift=self.gift)]
        result_link_ids = [str(link['id'])
                           for link in response.data.get('results')]

        while response.data.get('next'):
            next_url = response.data.get('next')
            response = self.client.get(next_url)
            result_link_ids += [str(link['id'])
                                for link in response.data.get('results')]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(expected_link_ids), len(result_link_ids))
        self.assertListEqual(expected_link_ids, result_link_ids)

    def test_get_link_by_id(self):
        target = Link.objects.first()
        url = reverse('gift-link-detail',
                      kwargs={'gift_id': self.gift.id, 'pk': target.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('id'), str(target.id))

    def test_cannot_retrieve_another_gifts_link(self):
        target = LinkFactory()
        url = reverse('gift-link-detail',
                      kwargs={'gift_id': self.gift.id, 'pk': target.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class LinkCreateTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.gift = GiftFactory(user=self.user)
        self.client.force_authenticate(user=self.user)

    def test_create_link(self):
        url = reverse('gift-link-list', kwargs={'gift_id': self.gift.id})
        data = {'url': "https://google.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('url'), data.get('url'))
        self.assertEqual(response.data.get('gift'), self.gift.id)

    def test_link_must_have_url(self):
        url = reverse('gift-link-list', kwargs={'gift_id': self.gift.id})
        data = {'url': ""}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Link.objects.count(), 0)

    def test_valid_url(self):
        url = reverse('gift-link-list', kwargs={'gift_id': self.gift.id})
        data = {'url': "bad_url"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Link.objects.count(), 0)


class LinkDeleteTests(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserFactory()
        self.gift = GiftFactory(user=self.user)
        self.client.force_authenticate(user=self.user)

    def test_delete_gift(self):
        target = LinkFactory(gift=self.gift)
        url = reverse('gift-link-detail',
                      kwargs={'gift_id': self.gift.id, 'pk': target.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Link.DoesNotExist):
            Link.objects.get(id=target.id)

    def test_gift_not_found(self):
        target = LinkFactory()
        url = reverse('gift-link-detail',
                      kwargs={'gift_id': self.gift.id, 'pk': target.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
