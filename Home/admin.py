from django.contrib import admin
from .models import *
# Register your models here.


class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'delegate', 'formation', 'capital', 'annual_revenue', 'address', 'phone', 'fax', 'employees_quantity', 'business', 'delivery_record']
    list_editable = ['name', 'delegate', 'formation', 'capital', 'annual_revenue', 'address', 'phone', 'fax', 'employees_quantity', 'business', 'delivery_record']


class JobVacancyAdmin(admin.ModelAdmin):
    list_display = ['id', 'job_vacancy', 'describe']
    list_editable = ['job_vacancy', 'describe']


class JobVacancyInline(admin.TabularInline):
    model = JobVacancy


class RecruitmentRequirementAdmin(admin.ModelAdmin):
    inlines = [JobVacancyInline]
    list_display = ['id', 'get_job_vacancies', 'condition', 'workplace', 'working_hours', 'salary', 'benefits', 'holiday']
    list_editable = ['condition', 'workplace', 'working_hours', 'salary', 'benefits', 'holiday']

    def get_job_vacancies(self, obj):
        return ", ".join([job.job_vacancy for job in obj.job_vcc.all()])

    get_job_vacancies.short_description = 'Job Vacancies'


class BusinessAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'business', 'describe', 'image']
    list_editable = ['category', 'business', 'describe', 'image']


class EquipmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'quantity', 'image']
    list_editable = ['name', 'quantity', 'image']


class ContactAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'company_name', 'name', 'Furigana', 'zip_code', 'get_address', 'phone', 'fax', 'email', 'is_apply', 'contact_method', 'contact_time']


admin.site.register(CompanyInfo, CompanyInfoAdmin)
admin.site.register(RecruitmentRequirement, RecruitmentRequirementAdmin)
admin.site.register(JobVacancy, JobVacancyAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(Contact, ContactAdmin)
