from .models import Contact
from django import forms


class ContactForm(forms.ModelForm, forms.Form):
    categories_choices = [(0, '製作の相談'), (1, '採用について'), (2, '協力企業について'), (3, 'その他')]
    province_choices = [(0, '選択してください'), (1, '北海道'), (2, '青森県'), (3, '岩手県'), (4, '宮城県'),
                        (5, '秋田県'), (6, '山形県'), (7, '福島県'), (8, '茨城県'), (9, '栃木県'),
                        (10, '群馬県'), (11, '埼玉県'), (12, '千葉県'), (13, '東京都'), (14, '神奈川県'),
                        (15, '新潟県'), (16, '富山県'), (17, '石川県'), (18, '福井県	'), (19, '山梨県'),
                        (20, '長野県'), (21, '岐阜県'), (22, '静岡県'), (23, '愛知県'), (24, '三重県'),
                        (25, '滋賀県'), (26, '京都府'), (27, '大阪府'), (28, '兵庫県'), (29, '奈良県'),
                        (30, '和歌山県'), (31, '鳥取県'), (32, '島根県'), (33, '岡山県'), (34, '広島県'),
                        (35, '山口県'), (36, '徳島県'), (37, '香川県'), (38, '愛媛県'), (39, '高知県'),
                        (40, '福岡県'), (41, '佐賀県'), (42, '長崎県'), (43, '熊本県'), (44, '大分県'),
                        (45, '宮崎県'), (46, '鹿児島県'), (47, '沖縄県')]
    contact_method_choices = [(0, '両方'), (1, '電話'), (2, 'メール')]
    contact_time_choices = [(0, 'いつでも'), (1, '9:00～12:00'), (2, '12:00～15:00'), (3, '15:00～18:00'), (4, '18:00～21:00')]

    category = forms.ChoiceField(
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'}),
        choices=categories_choices,
        initial=0
    )

    province = forms.ChoiceField(
        widget=forms.Select(attrs={'class': 'form-select c-form__width--md p-region'}),
        choices=province_choices,
        initial=0,
    )

    contact_method = forms.ChoiceField(
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'}),
        choices=contact_method_choices,
        initial=0
    )

    contact_time = forms.ChoiceField(
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'}),
        choices=contact_time_choices,
        initial=0
    )

    request_detail = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['company_name'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['name'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['Furigana'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['zip_code'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['city'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['street_address'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['building_name'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['phone'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['fax'].widget.attrs.update({'class': 'form-control c-form__width--xl'})
        self.fields['email'].widget.attrs.update({'class': 'form-control c-form__width--xl'})

    class Meta:
        model = Contact
        fields = ['company_name', 'name', 'Furigana', 'zip_code', 'city', 'street_address', 'building_name', 'phone', 'fax', 'email']
