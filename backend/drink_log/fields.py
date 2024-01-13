from django.db.models import DateTimeField


class DateTimeWithoutTimeZoneField(DateTimeField):
    """
    Returns "timestamp" instead of "timestamp with time zone"
    """

    def db_type(self, connection) -> str:
        return "timestamp"
