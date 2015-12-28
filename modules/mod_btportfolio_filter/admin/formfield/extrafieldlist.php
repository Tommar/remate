<?php

defined('_JEXEC') or die;

jimport('joomla.html.html');
jimport('joomla.form.formfield');

class JFormFieldExtraFieldList extends JFormFieldList
{

	protected $type = 'ExtraFieldList';

	protected function getOptions()
	{

		$db		= JFactory::getDbo();
		$query	= $db->getQuery(true);

		$query->select('id ,name , type');
		$query->from('#__bt_portfolio_extrafields');
		$query->where('type=\'dropdown\' OR type=\'measurement\' AND published=1');
		$query->order('ordering');
		$db->setQuery($query);
		$options =  $db->loadObjectList();
		$options = array_merge(parent::getOptions(), $options);
		$this->element['size'] = count($options);
		return $options;
	}
	protected function getInput()
	{		
		$html = array();
		$selectTypes= array();
		$type="checkbox";
		$attr = '';
		//var_dump($this);
		 $value = $this->value;
        if (!is_array($value)) {
            // Convert the selections field to an array.
            $registry = new JRegistry;
            $registry->loadString($value);
            $value = $registry->toArray();
        }
		$doc = JFactory::getDocument();
        $doc->addScriptDeclaration("
		window.addEvent('domready',function(){
            \$\$('div.menu-options select').addEvent('mouseover',function(event){MenusSortable.detach();})
            \$\$('div.menu-options select').addEvent('mouseout',function(event){MenusSortable.attach();})
			var MenusSortable = new Sortables(\$('ul_" . $this->id . "'),{
				clone:true,
				revert: true,
                preventDefault: true,
				onStart: function(el) {
					el.setStyle('background','#bbb');
				},
				onComplete: function(el) {
					el.setStyle('background','#eee');
				}
			});
		});");
		
		$i = 0;
		$attr .= $this->element['class'] ? ' class="'.(string) $this->element['class'].'"' : '';
		$attr .= $this->element['size'] ? ' size="'.(int) $this->element['size'].'"' : '';
		$attr .=  ' ' ;
		$attr .= $this->element['onchange'] ? ' onchange="'.(string) $this->element['onchange'].'"' : '';
		$options = (array) $this->getOptions();	
		$html = '<ul id="ul_' . $this->id . '" class="ul_sortable">';
		$this->currentItems = array_keys($value);        
        uasort($options, array($this, 'myCompare'));
		  foreach ($options as $option) {		  
		   $selected = (isset($this->value[$option->id]['checked']) ? ' checked="checked"' : '');
		   $i++;
           $html .= '<li id="menu_' . $i . '">';
		   $html .=  '  <input type="' . $type . '" id="' . $this->id . '_' . $i . '" name="' . $this->name.'['.($option->id).'][checked]'. '" ' . $attr.$selected . ' /><label for="' . $this->id . '_' . $i . '" class="menu_label">' . $option->name . '</label>';
		  if($option->type =="dropdown"){
			$html .= '  <div class="menu-options" id="menu_options_' . $i . '">' ;
			$selectTypes = array();
			$selectTypes[]=JHTML::_('select.option', 'dropdown', 'Dropdown-list');
			$selectTypes[]=JHTML::_('select.option', 'multiple', 'Multiple list');
			$selectTypes[]=JHTML::_('select.option', 'radio', 'Radio button');
			$selectTypes[]=JHTML::_('select.option', 'checkbox', 'Checkbox list');
			$html .= JHtml::_('select.genericlist', $selectTypes, $this->name.'['.($option->id).'][type]', trim($attr), 'value', 'text', (!empty($this->value[$option->id])? $this->value[$option->id]:''), $option->id);
			$html .=    '</div>';
			}
			 if($option->type=="measurement"){			 
				$html .= '  <div class="menu-options" id="menu_options_' . $i . '">' ;
				$selectTypes = array();
				$selectTypes[]=JHTML::_('select.option', 'texrange', 'Value Range');
				$selectTypes[]=JHTML::_('select.option', 'select', 'Drop down-list');			
				$html .= JHtml::_('select.genericlist', $selectTypes, $this->name.'['.($option->id).'][type]', trim($attr), 'value', 'text', (!empty($this->value[$option->id])? $this->value[$option->id]:''), $option->id);
				$html .='<br/>';				
				$html .='<input type="text" title="'.JText::_('MOD_BT_PORTFOLIOFILTER_INPUTVALUE').'" class="inputbox" name="'.$this->name.'['.($option->id).'][value]'.'" value="'.(!empty($this->value[$option->id]['value'])? $this->value[$option->id]['value'] :'').'">';
				$html .=    '</div>';
			 }
			 $html .= '</li>';
		}
		$html .= "</ul>";
	
		return ($html);
	}
	 public function myCompare($a, $b) {	
        $indexA = array_search($a->id, $this->currentItems);
        $indexB = array_search($b->id, $this->currentItems);
        if ($indexA === $indexB && $indexA !== false) {
            return 0;
        }
        if ($indexA === false && $indexA === $indexB) {
            return ($a->id < $b->id) ? -1 : 1;
        }
        if ($indexA === false) {
            return 1;
        }
        if ($indexB === false) {
            return -1;
        }
        return ($indexA < $indexB) ? -1 : 1;
    }
	
}
