<?php
/**
 * @package 	BT Quick Contact
 * @version		1.1
 * @created		Aug 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support     Forum - http://bowthemes.com/forum/
 * @copyright   Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
defined('_JEXEC') or die;

class BTQuickContactHelper {

    private $_result;
    private $_thanksMessage;
    private $_errorMessages;
    private $_jsonResponse;

    public function __construct() {
        $this->_result = true;
        $this->_errorMessages = array();
        $this->_jsonResponse = array();
    }

    /**
     * Process posted data and send email
     * @param type $module
     * @param type $params Back-end params
     * @param type $fields All fields of contact form
     */
    public function doPost($module, $params, $fields) {
        //xu ly page break và post
        if (JRequest::get('post') && JRequest::getVar('btqc' . $module->id)) {
            $data = JRequest::getVar('btqc' . $module->id);  //get submitted data
            //validate data by PHP
            foreach ($fields as $field) {
                if($field->type == 'pagebreak' || $field->type== 'separator') continue;
                //nếu là checkbox và radio được required mà không được submit hoặc không có giá trị nào
                if ($field->type == 'checkbox' && $field->type == 'radio' && $field->required) {
                    if ($data[$field->alias] && !count($data[$field->alias])) {
                        $this->_result = false;
                        $this->_errorMessages[] = JText::_('ERROR_REQUIRED');
                    }
                    continue;
                }
                //Nếu là file thì check trong $_FILES
                else if ($field->type == 'file') {
                    //nếu file required thì bắt buộc file check
                    if ($field->required) {
                        if (empty($_FILES) || !$_FILES['btqc' . $module->id]['tmp_name']['btqc_f_' . $field->alias]) {
                            $this->_result = false;
                            $this->_errorMessages[] = JText::_('ERROR_FILE_REQUIRED');
                            continue;
                        }
                    }

                    if (!empty($_FILES)) {
                        if(!key_exists('btqc_f_' . $field->alias, $_FILES['btqc' . $module->id]['tmp_name'])) 
                                continue;
                        $file = $_FILES['btqc' . $module->id]['tmp_name']['btqc_f_' . $field->alias];
                        if ($file) {
                            $fileExt = explode('.', $_FILES['btqc' . $module->id]['name']['btqc_f_' . $field->alias]);
                            $fileExt = strtolower($fileExt[1]);
                            //check ext
                            if ($field->ext && strpos($field->ext, $fileExt) === false) {
                                $this->_result = false;
                                $this->_errorMessages[] = sprintf(JText::_('ERROR_EXT'), str_replace('|', ',', $field->ext));
                            }
                            //check size
                            if (filesize($file) > $field->maxSize * 1024 * 1024) {
                                $this->_result = false;
                                $this->_errorMessages[] = sprintf(JText::_('ERROR_MAXSIZE'), $field->maxSize . 'MB');
                            }
                            //neu file khong được sumbit mà được required    
                        }
                    }
                    continue;
                } else {
                    if ($field->required && (!key_exists('btqc_f_' . $field->alias, $data) || !$data['btqc_f_' . $field->alias])) {
                        $this->_result = false;
                        $this->_errorMessages[] = JText::_('ERROR_REQUIRED');
                        continue;
                    }
                    if (!$field->required && (!key_exists('btqc_f_' . $field->alias, $data) || $data['btqc_f_' . $field->alias] == '')) {
                        continue;
                    }
                    //kiểu số
                    if ($field->type == 'number' && $data['btqc_f_' . $field->alias] && !is_numeric($data['btqc_f_' . $field->alias])) {
                        $this->_result = false;
                        $this->_errorMessages[] = JText::_('ERROR_NUMBER');
                    }
                    //kiểu email
                    if ($field->type == 'email' && $data['btqc_f_' . $field->alias]) {
                        $preg = "/^( [a-zA-Z0-9] )+( [a-zA-Z0-9\._-] )*@( [a-zA-Z0-9_-] )+( [a-zA-Z0-9\._-] +)+$/";
                        if (preg_match($preg, $data['btqc_f_' . $field->alias])) {
                            $this->_result = false;
                            $this->_errorMessages[] = JText::_('ERROR_EMAIL');
                        }
                    }
                    //kiểu ngày
                    if ($field->type == 'date' && $data['btqc_f_' . $field->alias] && !strtotime($data['btqc_f_' . $field->alias])) {
                        $this->_result = false;
                        $this->_errorMessages[] = JText::_('ERROR_DATE');
                    }
                    continue;
                }
            }
            //nếu không có lỗi post và có sài captcha thì kiểm tra captcha

            if ($this->_result) {
                if ($params->get('captcha') != '0') {
                    $plugin = BTQuickContactHelper::getCaptchaPlugin($params);
                    if ($plugin) {
                        $captcha = JCaptcha::getInstance($plugin);
                        if (!$captcha->checkAnswer('')) {
                            $this->_result = false;
                            $this->_errorMessages[] = JText::_('ERROR_CAPTCHA');
                            $this->_jsonResponse['captchaError'] = true;
                        }
                    }
                }
            }
            if ($this->_result) {
                //send mail
                if (self::sendMail($data, $fields, $params, $module)) {
                    //show thank you msg
                    $this->_thanksMessage = $params->get('thank_message');

                    //redirect
                    if ($params->get('redirect_url')) {
                        $this->_jsonResponse['redirectUrl'] = $params->get('redirect_url');
                        $this->_jsonResponse['timeOut'] = 3000;
                    }
                } else {
                    $this->_result = false;
                    $this->_errorMessages[] = jText::_('ERROR_SEND_EMAIL');
                }
            }

            if ($this->_result) {
                $this->_jsonResponse['success'] = true;
                $this->_jsonResponse['messages'] = json_encode(array($this->_thanksMessage));
            } else {
                $this->_jsonResponse['success'] = false;
                $this->_jsonResponse['messages'] = json_encode($this->_errorMessages);
            }
			$level = ob_get_level();
			while($level > 0){
				ob_end_clean();
				$level--;
			}
            echo json_encode($this->_jsonResponse);
            exit();
        }
    }

    public static function getCaptchaPlugin($params) {
        $captcha = $params->get('captcha');
        if (is_null($captcha)) {
            return JFactory::getApplication()->getParams()->get('captcha', JFactory::getConfig()->get('captcha'));
        } else if ($captcha == '0') {
            return false;
        } else {
            return $params->get('captcha');
        }
    }

    public static function createCaptcha($params, $name, $id, $class = '') {
        $plugin = self::getCaptchaPlugin($params);
        if (!$plugin)
            return '';
        else {
            $captcha = JCaptcha::getInstance($plugin);
            if ($captcha == null) {
                return '';
            }
        }

        return $captcha->display($name, $id, $class);
    }

    /**
     * Send mail to admin email
     * @param array $data Array contains all data which is submitted from form
     * @param array $fields Array contains all field that need to be sended
     * @param type $params Params of module
     */
    public static function sendMail($data, $fields, $params, $module) {
        $mailer = JFactory::getMailer();
        $config = JFactory::getConfig();
		$sender = array();
		if($params->get('sender','config')=='user' && key_exists('btqc_f_email', $data) && $data['btqc_f_email']){
			$sender = array(
				$data['btqc_f_email'],
				(key_exists('btqc_f_name', $data) && $data['btqc_f_name'])?$data['btqc_f_name']:''
			);
		}else{
			$sender = array(
				$config->get('mailfrom'),
				$config->get('fromname')
			);
		}
        $mailer->setSender($sender);

        //get recipient;
        $recipients = array();
        if ($params->get('admin_email')) {
            $recipients = explode(',', $params->get('admin_email'));
        } else {
            $recipients[] = $config->get('mailfrom');
        }


        //get subject
        if ($params->get('subject')) {
            $subject = $params->get('subject');
        } else {
            $subject = $module->title;
        }
        $mailer->addRecipient($recipients);

        //build body
		$body = '';
		if($params->get('pre_text')) $body .= $params->get('pre_text');
        $body .= '<table>';
        foreach ($fields as $field) {
            if($field->type == 'separator' || $field->type == 'pagebreak') continue;
            if (key_exists('btqc_f_' . $field->alias, $data) && $data['btqc_f_' . $field->alias]) {
                //check if it has checkbox, multiple select submitted
                if (is_array($data['btqc_f_' . $field->alias]))
                    $data['btqc_f_' . $field->alias] = implode(', ', $data['btqc_f_' . $field->alias]);
                //check file upload
                $body.= '<tr><td><b>'.$field->title . ":</b></td><td> " . $data['btqc_f_' . $field->alias] . "</td>\n";
            }
        }
		
		
        $body .= '</table>';
		if($params->get('post_text')) $body .= $params->get('post_text');
		
        //add tmp file for data from $_FILES
        $files = array();
        if (!empty($_FILES)) {
            $tmpNames = $_FILES['btqc' . $module->id]['tmp_name'];
            $names = $_FILES['btqc' . $module->id]['name'];
            foreach ($tmpNames as $alias => $tmpName) {
                if ($tmpName) {
                    $file = JPATH_BASE . '/modules/mod_btquickcontact/files/'. $names[$alias];
                    move_uploaded_file($tmpName, $file);
                    $mailer->addAttachment($file);
                    $files[] = $file;
                }
            }
        }
        //send
        $mailer->setSubject($subject);
        $mailer->setBody($body);
        $mailer->isHTML(true);
        // Optional file attached

        $send = & $mailer->Send();
        //send copy
        if (key_exists('btqc_f_sendcopy', $data) && $data['btqc_f_sendcopy']) {
            $mailer->ClearAllRecipients();
            if (key_exists('btqc_f_email', $data) && $data['btqc_f_email'])
                $mailer->addRecipient($data['btqc_f_email']);
            else {
                foreach ($fields as $field) {
                    if ($field->type == 'email' && key_exists('btqc_f_' . $field->alias, $data) && $data['btqc_f_' . $field->alias]) {
                        $mailer->addRecipient($data['btqc_f_' . $field->alias]);
                        break;
                    }
                }
            }
            $mailer->setSubject(sprintf(JText::_('SEND_COPY_SUBJECT'), $subject));
            $mailer->Send();
        }

        //delete file
        if (!empty($files)) {
            foreach ($files as $file)
                @JFile::delete($file);
        }
        return $send === true ? true : false;
    }

    public static function fetchHead($params) {
        $document = JFactory::getDocument();
        $header = $document->getHeadData();
        $mainframe = JFactory::getApplication();
        $template = $mainframe->getTemplate();
        $layout = $params->get('layout', 'default');
        $templatePath = JPATH_SITE . '/templates/' . $template . '/html/mod_btquickcontact';
        $templateURL = JURI::root() . 'templates/' . $template . '/html/mod_btquickcontact/';
        $moduleTmplURL = JURI::root() . 'modules/mod_btquickcontact/tmpl/';
        $loadJquery = $params->get('load_jquery', 1);

        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/jquery')) {
                $loadJquery = false;
            }
        }


        //Add js
        if ($loadJquery) {
            $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/jquery.min.js');
        }
        //add available js
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/validate.jquery.js');
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/form.jquery.js');
        //if form type is modal
        if ($params->get('form_type') == 'popup') {
            $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/simplemodal.jquery.js');
        }
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/default.js');
        //override css
        if (is_dir($templatePath .'/layouts/' . $layout)) {
            $document->addStyleSheet($templateURL . 'layouts/' . $layout . '/css/btquickcontact.css');
        } else {
            $document->addStyleSheet($moduleTmplURL . 'layouts/' . $layout . '/css/btquickcontact.css');
        }
    }

    public static function getFileStyleJS() {
        $document = JFactory::getDocument();
        $loadFileStyleJS = true;
        $header = $document->getHeadData();
        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/filestyle.jquery')) {
                $loadFileStyleJS = false;
                break;
            }
        }
        if ($loadFileStyleJS)
            $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/filestyle.jquery.js');
        return true;
    }

}

?>
