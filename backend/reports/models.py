from django.db import models
from django.apps import apps
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()


def status_pending() -> int:
    pending, _ = UserReportStatus.objects.get_or_create(status="pending")
    return pending.pk


class UserReportStatus(models.Model):
    status = models.CharField(max_length=30, unique=True)

    def save(self, *args, **kwargs) -> None:
        self.status = self.status.lower()
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.status

    class Meta:
        verbose_name_plural = "statuses"


REPORTABLE_OBJECTS = {
    1: "beverage",
    2: "brand",
}


class UserReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reported_object_type = models.PositiveSmallIntegerField(
        choices=REPORTABLE_OBJECTS, blank=True, null=True
    )
    reported_object_id = models.PositiveIntegerField(blank=True, null=True)
    reason = models.CharField(max_length=20)
    text = models.CharField(max_length=350, blank=True, null=True)
    status = models.ForeignKey(
        UserReportStatus,
        on_delete=models.SET_DEFAULT,
        default=status_pending,
    )
    reported_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    moderator_comment = models.CharField(max_length=350, blank=True, null=True)

    @property
    def object_name(self):
        return REPORTABLE_OBJECTS.get(self.reported_object_type)

    def get_reported_object(self):
        obj = None
        model_name = REPORTABLE_OBJECTS.get(self.reported_object_type)
        if model_name:
            model = apps.get_model("beverages", model_name)
            if model:
                obj = model.objects.filter(pk=self.reported_object_id).first()
        return obj

    def get_reported_object_url(self) -> None | str:
        model_name = REPORTABLE_OBJECTS.get(self.reported_object_type)
        if model_name and self.reported_object_id:
            return reverse(
                f"admin:beverages_{model_name}_change",
                args=[self.reported_object_id],
            )
        return None

    def __str__(self) -> str:
        return self.reason
