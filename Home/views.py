from django.shortcuts import render, get_object_or_404, redirect
from django import forms
from django.http import HttpResponse
from django.views import View
from .models import *
from .forms import ContactForm


# Create your views here.
class HomeView(View):
    def get(self, request):
        cpn_info = CompanyInfo.objects.all()
        if len(cpn_info) > 0:
            cpn_info = cpn_info[0]
        context = {'cpn_info': cpn_info}
        return render(request, 'home.html', context)


class CompanyInfoView(View):
    def get(self, request):
        cpn_info = CompanyInfo.objects.all()
        if len(cpn_info) > 0:
            cpn_info = cpn_info[0]

        rcm_rq = RecruitmentRequirement.objects.all()
        if len(rcm_rq) > 0:
            rcm_rq = rcm_rq[0]

        job_vcc = JobVacancy.objects.all()
        context = {'cpn_info': cpn_info,
                   'rcm_rq': rcm_rq,
                   'job_vcc': job_vcc}
        return render(request, 'company.html', context)


class BusinessView(View):
    def get(self, request):
        cpn_info = CompanyInfo.objects.all()
        if len(cpn_info) > 0:
            cmn_info = cpn_info[0]
        business_lst = Business.objects.all()
        bsns = []
        for bsn in business_lst:
            print(bsn.image)
        for bsn in business_lst:
            bsns.append([bsn.id % 2 == 0, bsn])
        context = {'cpn_info': cpn_info,
                   'bsns': bsns}
        return render(request, 'business.html', context)


class EquipmentsView(View):
    def get(self, request):
        cpn_info = CompanyInfo.objects.all()
        if len(cpn_info) > 0:
            cmn_info = cpn_info[0]
        equips = Equipment.objects.all().order_by('name')
        context = {'cmn_info': cpn_info,
                   'equips': equips}
        return render(request, 'equipment.html', context)


class ContactView(View):
    def get(self, request):
        form = ContactForm()
        cpn_info = CompanyInfo.objects.all()
        if len(cpn_info) > 0:
            cpn_info = cpn_info[0]
        context = {'cpn_info': cpn_info,
                   'form': form}
        return render(request, 'contact.html', context)

    def post(self, request, *args, **kwargs):
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'success.html')
        else:
            cpn_info = CompanyInfo.objects.all()
            if len(cpn_info) > 0:
                cpn_info = cpn_info[0]
            context = {'cpn_info': cpn_info,
                       'form': form}
            return render(request, 'contact.html', context)


def contactForm(request):
    if request.method == 'POST':
        category = int(request.POST.get('category'))
        company_name = request.POST.get('company_name')
        name = request.POST.get('name')
        furigana = request.POST.get('furigana')
        zip_code = request.POST.get('zip_code')
        province = int(request.POST.get('province'))
        city = request.POST.get('city')
        street_address = request.POST.get('street_address')
        building_name = request.POST.get('building_name')
        phone = request.POST.get('phone')
        fax = request.POST.get('fax')
        email = request.POST.get('email')
        request_detail = request.POST.get('request_detail')
        contact_method = int(request.POST.get('contact_method'))
        contact_time = int(request.POST.get('contact_time'))

        Contact.objects.create(category=category, company_name=company_name, name=name, Furigana=furigana,
                               zip_code=zip_code, province=province, city=city, street_address=street_address,
                               building_name=building_name, phone=phone, fax=fax, email=email,
                               request_detail=request_detail, contact_method=contact_method,
                               contact_time=contact_time)
    return redirect(request.META.get('HTTP_REFERER'))
