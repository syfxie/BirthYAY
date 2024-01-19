import datetime as dt
from django.core.exceptions import ValidationError


def validate_date_in_past(date):
    if date and dt.datetime.strptime(str(date), '%Y-%m-%d') > dt.datetime.strptime(str(dt.date.today()), '%Y-%m-%d'):
        raise ValidationError('Birthday must be in the past.')


def validate_positive(num):
    if num and num < 0:
        raise ValidationError('Price must be positive')
