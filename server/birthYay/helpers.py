from decimal import Decimal


def round_to_two_decimals(num):
    if type(num) == Decimal:
        num = round(num, 2)
    else:
        try:
            num = round(Decimal(num), 2)
        except TypeError:
            return num
        