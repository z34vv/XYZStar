from django.db import models


class CompanyInfo(models.Model):
    name = models.CharField(max_length=255)
    delegate = models.CharField(max_length=255)
    formation = models.DateField()
    capital = models.BigIntegerField(default=0)
    annual_revenue = models.BigIntegerField(default=0)
    address = models.TextField()
    zip_code = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=10)
    fax = models.CharField(max_length=10)
    employees_quantity = models.IntegerField(default=1)
    business = models.TextField()
    delivery_record = models.TextField()
    objects = models.Manager()

    class Meta:
        db_table = 'Company Information'


class RecruitmentRequirement(models.Model):
    condition = models.TextField()
    workplace = models.TextField()
    working_hours = models.CharField(max_length=255)
    salary = models.CharField(max_length=255)
    benefits = models.TextField()
    holiday = models.TextField()
    objects = models.Manager()

    class Meta:
        db_table = 'Recruitment Requirement'


class JobVacancy(models.Model):
    recruitment_requirement = models.ForeignKey(RecruitmentRequirement, on_delete=models.CASCADE, related_name='job_vcc')
    job_vacancy = models.CharField(max_length=100)
    describe = models.TextField()
    objects = models.Manager()

    class Meta:
        db_table = 'Job Vacancy'


class Business(models.Model):
    category = models.CharField(max_length=100)
    business = models.CharField(max_length=100)
    describe = models.TextField()
    image = models.ImageField(upload_to='images')
    objects = models.Manager()

    class Meta:
        db_table = 'Business'


class Equipment(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    image = models.ImageField(upload_to='images')
    objects = models.Manager()

    class Meta:
        db_table = 'Equipments'


class Contact(models.Model):
    category_lst = ((0, '製作の相談'), (1, '採用について'), (2, '協力企業について'), (3, 'その他'))
    category = models.IntegerField(choices=category_lst, default=0)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=100)
    Furigana = models.CharField(max_length=100, null=True, blank=True)
    zip_code = models.CharField(max_length=50, null=True, blank=True)
    province_lst = ((0, ''), (1, '北海道'), (2, '青森県'), (3, '岩手県'), (4, '宮城県'),
                    (5, '秋田県'), (6, '山形県'), (7, '福島県'), (8, '茨城県'), (9, '栃木県'),
                    (10, '群馬県'), (11, '埼玉県'), (12, '千葉県'), (13, '東京都'), (14, '神奈川県'),
                    (15, '新潟県'), (16, '富山県'), (17, '石川県'), (18, '福井県	'), (19, '山梨県'),
                    (20, '長野県'), (21, '岐阜県'), (22, '静岡県'), (23, '愛知県'), (24, '三重県'),
                    (25, '滋賀県'), (26, '京都府'), (27, '大阪府'), (28, '兵庫県'), (29, '奈良県'),
                    (30, '和歌山県'), (31, '鳥取県'), (32, '島根県'), (33, '岡山県'), (34, '広島県'),
                    (35, '山口県'), (36, '徳島県'), (37, '香川県'), (38, '愛媛県'), (39, '高知県'),
                    (40, '福岡県'), (41, '佐賀県'), (42, '長崎県'), (43, '熊本県'), (44, '大分県'),
                    (45, '宮崎県'), (46, '鹿児島県'), (47, '沖縄県'))
    province = models.IntegerField(choices=province_lst, default=0)
    city = models.CharField(max_length=100, null=True, blank=True)
    street_address = models.CharField(max_length=100, null=True, blank=True)
    building_name = models.CharField(max_length=100, null=True, blank=True)

    phone = models.CharField(max_length=10)
    fax = models.CharField(max_length=10, null=True, blank=True)
    email = models.CharField(max_length=255)
    request_detail = models.TextField()

    is_apply = models.BooleanField(default=False)
    contact_method_lst = ((0, '両方'), (1, '電話'), (2, 'メール'))
    contact_method = models.IntegerField(choices=contact_method_lst, max_length=1, null=True, blank=True)
    contact_time_lst = ((0, 'いつでも'), (1, '9:00～12:00'), (2, '12:00～15:00'), (3, '15:00～18:00'), (4, '18:00～21:00'))
    contact_time = models.IntegerField(choices=contact_time_lst, max_length=1, null=True, blank=True)
    objects = models.Manager()

    def get_address(self):
        return f"{self.building_name} {self.street_address} {self.city} {str(self.province)}"

    class Meta:
        db_table = 'Contact'
