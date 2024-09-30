// jqueryのセレクタ用に文字列をエスケープする
function ez_mf_selector_escape(val) {
  return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}

// フィールドに値をセットする
function ez_mf_set_value($form, controller, value, base_key, key) {

  var full_key;
  if (base_key === "") {
    full_key = key;
  } else {
    full_key = base_key + '[' + key + ']';
  }

//  console.log("■" + full_key);
//  console.log(value);
//  console.log("  ");

  // フィールドに値をセットする：実処理部
  var set_value = function (key, value) {
    var is_no_specific = (key.slice(-2) === '[]');

    if (!is_no_specific) { // キーが特定できる
      var $word = $form.find('input[type="text"][name="' + ez_mf_selector_escape(key) + '"]');
      if ($word.length > 0) {
        $word.val(value).trigger('input');
        return;
      }

      var $word = $form.find('input[type="email"][name="' + ez_mf_selector_escape(key) + '"]');
      if ($word.length > 0) {
        $word.val(value).trigger('input');
        return;
      }

      var $word = $form.find('input[type="number"][name="' + ez_mf_selector_escape(key) + '"]');
      if ($word.length > 0) {
        $word.val(value).trigger('input');
        return;
      }

      var $word = $form.find('input[type="tel"][name="' + ez_mf_selector_escape(key) + '"]');
      if ($word.length > 0) {
        $word.val(value).trigger('input');
        return;
      }

      var $word = $form.find('input[type="color"][name="' + ez_mf_selector_escape(key) + '"]');
      if ($word.length > 0) {
        $word.val(value).trigger('input');
        return;
      }

      var $text = $form.find('textarea[name="' + ez_mf_selector_escape(key) + '"]');
      if ($text.length > 0) {
        $text.val(value).trigger('input');
        return;
      }

      var $select = $form.find('select[name="' + ez_mf_selector_escape(key) + '"]');
      if ($select.length > 0) {
        $select.val(value).trigger('change');
        return;
      }

      var $checkbox = $form.find('input[type="checkbox"][name="' + ez_mf_selector_escape(key) + '"][value="' + ez_mf_selector_escape(value) + '"]');
      if ($checkbox.length > 0) {
        $checkbox.prop("checked", true);
        $checkbox.attr("checked", "checked");
        $checkbox.triggerHandler("click");
        return;
      }

      var $radio = $form.find('input[type="radio"][name="' + ez_mf_selector_escape(key) + '"][value="' + ez_mf_selector_escape(value) + '"]');
      if ($radio.length > 0) {
        $radio.prop("checked", true);
        $radio.attr("checked", "checked");
        $radio.triggerHandler("click");
        return;
      }

    } else { // キーが特定できず、value値まで見る必要がある
      var $checkbox = $form.find('input[type="checkbox"][name="' + ez_mf_selector_escape(key) + '"][value="' + ez_mf_selector_escape(value) + '"]');
      if ($checkbox.length > 0) {
        $checkbox.prop("checked", true);
        $checkbox.attr("checked", "checked");
        $checkbox.triggerHandler("click");
        return;
      }

      var $radio = $form.find('input[type="radio"][name="' + ez_mf_selector_escape(key) + '"][value="' + ez_mf_selector_escape(value) + '"]');
      if ($radio.length > 0) {
        $radio.prop("checked", true);
        $radio.attr("checked", "checked");
        $radio.triggerHandler("click");
        return;
      }

    }
  };


  if (base_key === "") { // 配列でない要素
    set_value(key, value);
  } else {
    if (key.toString().match(/^[0-9]+$/)) {  // 配列内の数字インデックスの要素
      if ($('[name="' + ez_mf_selector_escape(full_key) + '"]').length === 0) {  // 配列内の数字インデックスの要素で、直接そのnameを持つform要素が存在しない時
        set_value(base_key + '[]', value);
      } else {                                                          // 配列内の数字インデックスの要素で、直接そのnameを持つform要素が存在する時
        set_value(full_key, value);
      }
    } else { // 配列内の文字列インデックスの要素
      set_value(full_key, value);
    }
  }
}

// ファイルフィールドに送信済みファイルの情報を付加する
function ez_mf_set_file($form, controller, base_url, value, base_key, value_key) {
  var obj = value;
  var obj_base_key = base_key;
  var obj_key = value_key;

  var obj_full_key;
  if (obj_base_key === "") {
    obj_full_key = obj_key;
  } else {
    obj_full_key = obj_base_key + '[' + obj_key + ']';
  }

//  console.log("■" + obj_full_key);
//  console.log(obj);
//  console.log("  ");

  var domain = base_url.replace(controller+'/','');

  if (obj['id'] && $form.find('input[type="file"][name="' + ez_mf_selector_escape(obj_full_key) + '"]').length > 0) {
    $('input[type="file"][name="' + ez_mf_selector_escape(obj_full_key) + '"]').hide().after(
      "<span class=\"ez_mf_file_description " + obj_full_key + "\">現在のファイル： <a href=\"" + domain + "data_files/view/"+obj['id']+"/mode:attachment/download:1\" target=\"_blank\">" + obj['file_full_value'] + "</a>" +
      " <span><button class=\"ez_mf_clear_before_file_button\" type=\"button\" onclick=\"ez_mf_clear_before_file(\'" + controller + "\',\'" + base_url + "remove_file_from_before_data/" + obj_full_key + '?' + (new Date()).getTime() + "\',\'" + obj_full_key + "\')\">ファイル選択を解除</button></span></span>"
      );
  }
}

// 送信済みファイルの情報を削除する
function ez_mf_clear_before_file(controller, url, key) {
  var field = key;
  var $form = $('form[action$="' + controller + '/postmail"]');
  $.ajax({
    //type: オプションは$.ajaxの初期値で"GET"です。
    url: url,
    dataType: 'json',
    data: null,
    success: function (data) {
      $form.find('.ez_mf_file_description.' + field).remove();
      $form.find('input[type="file"][name="' + ez_mf_selector_escape(field) + '"]').show();
    },
  });
}

// 送信済みファイルの情報を削除する
function ez_mf_clear_file(key) {
  var field = key;
//  console.log($(field).parent());
  var button = $(field).parent().find(".ez_mf_clear_before_file_button");
//  console.log(button);
  if (button.length > 0) {
    button.click();
  }
  $(field).val("").trigger("input").trigger("change");
}

function ez_mf_set_values($form, controller, base_url, value, base_key, value_key) {
  var obj = value;
  var obj_base_key = base_key;
  var obj_key = value_key;
  if (obj instanceof Object) { // 配列データ
    if (obj['isfile']) { // ファイルフィールドの配列
      ez_mf_set_file($form, controller, base_url, obj, obj_base_key, obj_key);
    } else { // ファイル以外の配列
      if (obj_base_key === "") {
        obj_base_key = obj_key;
      } else {
        obj_base_key = obj_base_key + '[' + obj_key + ']';
      }
      Object.keys(obj).forEach(function (key) {
        ez_mf_set_values($form, controller, base_url, obj[key], obj_base_key, key);
      });
    }
  } else { // 単項目
    ez_mf_set_value($form, controller, obj, obj_base_key, obj_key);
  }
}

function ez_mf_initialize(controller) {
//  var $form = $('form[action$="' + controller + '/postmail"]');
  var $forms = $('form');
  var $form = null;
  var action = '';
  $forms.each(function(){
    if ($form === null) {
      var $a_form = $(this);
      action = $a_form.attr('action');
//      if (action.match(new RegExp(controller + '/postmail(/?)(\\?.*)(#.*)'))) {
      if (action.match(new RegExp(controller + '/postmail'))) {
        $form = $a_form;
      }
    }
  });
//  if ($form.length > 0) {
  if ($form !== null) {
//    var action = $form.attr('action');
//    if (action === controller + '/postmail') {
    if (action.match(new RegExp('^' + controller + '/postmail'))) {
      action = '/' + action;
    }
//    var base_url = action.replace('postmail', '');
    var base_url = action.replace(/postmail(.*)$/, '');
    var url = base_url + 'get_before_data?' + (new Date()).getTime();

    $form.find('select').each(function(){
      var $selected_option = $(this).find('option').eq(0);

      $(this).find('option').each(function(){
        if ($(this).attr('selected') !== undefined) {
          $selected_option = $(this);
        }
      });
      
      $selected_option.prop('selected', true).closest('select').trigger('change');
    });

    $form.find('input[type="text"],input[type="password"],input[type="file"],textarea').val("").trigger('input');

    $form.find('input[type="checkbox"],input[type="radio"]').each(function(){
      if ($(this).attr('checked') === undefined) {
        $(this).prop('checked', false);
      } else {
        $(this).removeAttr('checked');
        $(this).prop('checked', true);
      }
    });

    $form.find('.ez_mf_file_description').remove();

    $.ajax({
      //type: オプションは$.ajaxの初期値で"GET"です。
      url: url,
      dataType: 'json',
      data: null,
      success: function (data) {
        if (data instanceof Object) {
          if (data['MailSend'] && data['MailSend'] instanceof Object) {
            ez_mf_set_values($form, controller, base_url, data['MailSend'], "", "");
          }else if (data['MemberAdd'] && data['MemberAdd'] instanceof Object) {
            ez_mf_set_values($form, controller, base_url, data['MemberAdd'], "", "");
          }
        }
        if (typeof ez_mf_custom_init == 'function') {
          ez_mf_custom_init($form);
        }
      },
    });
  }
}

function ez_mf_all_clear(controller) {
  var $form = $('form[action$="' + controller + '/postmail"]');
  if ($form.length > 0) {
    $form.find('select').val("").trigger('change');
    $form.find('input[type="text"],input[type="password"],input[type="file"],textarea').val("").trigger('input');
    $form.find('input[type="checkbox"],input[type="radio"]').prop('checked', false);
    $form.find('input[type="checkbox"],input[type="radio"]').removeAttr('checked');
    $form.find('.ez_mf_file_description').remove();
  }
}