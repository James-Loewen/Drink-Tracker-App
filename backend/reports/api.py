from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from ninja import Router, Schema

from .models import UserReport

router = Router()


class ReportSchema(Schema):
    reported_object_type: int = None
    reported_object_id: int = None
    reason: str
    text: str


@router.post("")
def post_report(request, data: ReportSchema):
    try:
        report = UserReport.objects.create(user=request.user, **data.dict())
    except Exception as e:
        print(f"Are you kidding me?... {e}")
        return "Could not create report"

    context = data.dict()
    context["url"] = report.get_reported_object_url()
    context["user_email"] = request.user.email

    text_body = render_to_string("reports/email.txt", context)

    print(context)
    print(type(context["text"]), context["text"])

    msg = EmailMultiAlternatives(
        "This is the subject, baby",
        text_body,
        "from@email.com",
        ["to@email.com"],
    )

    try:
        msg.send(fail_silently=False)
        return "Message sent successfully"
    except Exception as e:
        print(f"Something foul ran amok: {e}")
        return "Message was NOT sent successfully"
