<?php

/**
 * @package 	mod_btimagegallery - BT Image Gallery Module
 * @version		1.4
 * @created		Dec 2011
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined('_JEXEC') or die;

$source = $params->get('source');
$syncType = $params->get('sync_type');

$saveDir = JPATH_BASE . '/modules/mod_btimagegallery/images';
$dt = new stdClass();
if ($syncType != 'none') {
//sync
    $syncFile = JPATH_BASE . '/modules/mod_btimagegallery/syncflag';
    if (!file_exists($syncFile)) {
        $pt = fopen($syncFile, 'w+');
        $dt->syncing = false;
        $dt->last_sync = 0;
        fwrite($pt, json_encode($dt));
        fclose($pt);
    }

    $dt = file_get_contents($syncFile);
    $dt = json_decode($dt);

    if (!$dt->syncing) {
        $lastSync = $dt->last_sync;
        $syncInterval = $params->get('sync_interval');
        if ($lastSync + 3600 * 24 * $syncInterval < time()) {
            $dt->syncing = true;
            $dt->last_sync = time();
            $pt = fopen($syncFile, 'w+');
            fwrite($pt, json_encode($dt));
            fclose($pt);


            //get photos of source
            $sourcePhotos = array();
            switch ($source) {
                case 'jfolder':
                    $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif');
                    $jFolderPath =  JPATH_ROOT . '/' . $params->get('jfolder_path');

                    if (is_dir($jFolderPath)) {
                        $open = opendir($jFolderPath);
                        $arrFiles = array();
                        $filename = readdir($open);
                        while ($filename !== false) {
                            //check validated file
                            if (filetype($jFolderPath . '/' . $filename) == "file") {
                                $file = $jFolderPath . '/' . $filename;
                                $fileInfo = pathinfo($file);
                                if ($file
                                        && in_array(strtolower($fileInfo["extension"]), $allowedExtensions)) {
                                    $objFile = new stdClass();
                                    $objFile->file = $file;
                                    $objFile->title = $fileInfo['filename'];
                                    $objFile->source = 'jfolder-' . $params->get('jfolder_path');
                                    $sourcePhotos[] = $objFile;
                                }
                            }
                            $filename = readdir($open);
                        }
                        closedir($open);
                    }
                    break;
                case 'flickr':
                    $photosetid = $params->get('flickr_photosetid');
                    $flickrParams = array(
                        'api_key' => $params->get('flickr_api'),
                        'format' => 'php_serial'
                    );

                    $arrPhotoSetIDs = array();
                    if (!$photosetid) {

                        //lay user id tu username
                        $flickrParams['method'] = 'flickr.people.findByEmail';
                        $flickrParams['find_email'] = $params->get('flickr_userid');
                        $encoded_params = array();
                        foreach ($flickrParams as $k => $v) {
                            $encoded_params[] = urlencode($k) . '=' . urlencode($v);
                        }
                        $url = "http://api.flickr.com/services/rest/?" . implode('&', $encoded_params);
                        $ch = curl_init();
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_URL, $url);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						$rsp = curl_exec($ch);					
						curl_close($ch);
                        $objRSP = unserialize($rsp);
                        if ($objRSP['stat'] == 'ok') {
                            $flickrParams['user_id'] = $objRSP['user']['id'];
                        }
                        $flickrParams['method'] = 'flickr.photosets.getList';
                        $encoded_params = array();
                        foreach ($flickrParams as $k => $v) {
                            $encoded_params[] = urlencode($k) . '=' . urlencode($v);
                        }
                        $url = "http://api.flickr.com/services/rest/?" . implode('&', $encoded_params);
                        $ch = curl_init();
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_URL, $url);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						$rsp = curl_exec($ch);					
						curl_close($ch);
                        $objRSP = unserialize($rsp);
                        if ($objRSP['stat'] == 'ok') {
                            foreach ($objRSP['photosets']['photoset'] as $photoSet) {
                                $arrPhotoSetIDs[$photoSet['id']] = $photoSet['title']['_content'];
                            }
                        }
                    } else {
                        $flickrParams['method'] = 'flickr.photosets.getInfo';
                        $flickrParams['photoset_id'] = $photosetid;
                        $encoded_params = array();
                        foreach ($flickrParams as $k => $v) {
                            $encoded_params[] = urlencode($k) . '=' . urlencode($v);
                        }
                        $url = "http://api.flickr.com/services/rest/?" . implode('&', $encoded_params);
                        $ch = curl_init();
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_URL, $url);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						$rsp = curl_exec($ch);					
						curl_close($ch);
                        $objRSP = unserialize($rsp);
                        if ($objRSP['stat'] == 'ok') {
                            $arrPhotoSetIDs[$photosetid] = $objRSP['photoset']['title']['_content'];
                        }
                    }
                    //duyet photoset
                    foreach ($arrPhotoSetIDs as $photoSetID => $photoSetName) {
                        $flickrParams['method'] = 'flickr.photosets.getPhotos';
                        $flickrParams['photoset_id'] = $photoSetID;
                        $encoded_params = array();
                        foreach ($flickrParams as $k => $v) {
                            $encoded_params[] = urlencode($k) . '=' . urlencode($v);
                        }
                        $url = "http://api.flickr.com/services/rest/?" . implode('&', $encoded_params);
                        $ch = curl_init();
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_URL, $url);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						$rsp = curl_exec($ch);					
						curl_close($ch);
                        $objRSP = unserialize($rsp);

                        if ($objRSP['stat'] == 'ok') {
                            foreach ($objRSP['photoset']['photo'] as $photo) {
                                if (isset($photo['originalsecret']) && isset($photo['originalformat'])) {
                                    $file = "http://farm" . $photo['farm'] . ".static.flickr.com/" . $photo['server'] . "/" . $photo->id . "_" . $photo['originalsecret'] . "_o." . $photo['originalformat'];
                                } else {
                                    $file = "http://farm" . $photo['farm'] . ".static.flickr.com/" . $photo['server'] . "/" . $photo['id'] . "_" . $photo['secret'] . "_b.jpg";
                                }
                                $fileInfo = pathinfo($file);
                                if ($file) {
                                    $objFile = new stdClass();
                                    $objFile->file = $file;
                                    $objFile->title = $photo['title'];
                                    $objFile->source = 'flickr-' . $photoSetName;
                                    $sourcePhotos[] = $objFile;
                                }
                            }
                        }
                    }
                    break;
                case 'picasa':
                    //if source is picasa
                    $picasaUserID = $params->get('picasa_userid');

                    $picasaAlbumID = $params->get('picasa_albumid');
                    if (isset($picasaUserID)) {
                        // build feed URL

                        $arrFeedURLs = array();
                        if ($picasaAlbumID != 0) {
                            $arrFeedURLs[] = 'http://picasaweb.google.com/data/feed/base/user/' . $picasaUserID . '/albumid/' . $picasaAlbumID . '?alt=rss';
                        } else {
                            $feedURL = 'http://picasaweb.google.com/data/feed/api/user/' . $picasaUserID . '?alt=rss&kind=album';
                            $ch = curl_init();
							curl_setopt($ch, CURLOPT_HEADER, 0);
							curl_setopt($ch, CURLOPT_URL, $feedURL);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
							$tmp = curl_exec($ch);
							curl_close($ch);
							@$sxml = simplexml_load_string($tmp);
                            foreach ($sxml->channel->item as $entry) {
                                $guid = $entry->guid->__toString();
                                $albumID = substr($guid, strrpos($guid, '/') + 1, strrpos($guid, '?') - 1 - strrpos($guid, '/'));
                                $arrFeedURLs[] = 'http://picasaweb.google.com/data/feed/base/user/' . $picasaUserID . '/albumid/' . $albumID . '?alt=rss';
                            }
                        }

                        foreach ($arrFeedURLs as $feedURL) {
                            $ch = curl_init();
							curl_setopt($ch, CURLOPT_HEADER, 0);
							curl_setopt($ch, CURLOPT_URL, $feedURL);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
							$tmp = curl_exec($ch);
							curl_close($ch);
							@$sxml = simplexml_load_string($tmp);
                            foreach ($sxml->channel->item as $entry) {
                                $media = $entry->children('http://search.yahoo.com/mrss/');
                                $file = $media->group->content->attributes()->url->__toString();
                                $fileInfo = pathinfo($file);
                                if ($file) {

                                    $objFile = new stdClass();
                                    $objFile->file = $file;
                                    $objFile->title =  $entry->title->__toString();
                                    $objFile->source = 'picasa-' . $sxml->channel->title->__toString();

                                    $sourcePhotos[] = $objFile;
                                }
                            }
                        }
                    }
                    break;
                case 'jgallery':
                    $jgallery_catid = $params->get('jgallery_catid');
                    //if source is joom gallery
                    if (isset($jgallery_catid)) {
                        //include_once "helpers/helper.php";
                        $helper = new BTImageGalleryHelper();
                        if ($helper->checkJGalleryComponent()) {
                            $rs = $helper->getJoomGalleryPhotos($jgallery_catid);
                            if (count($rs) > 0) {
                                foreach ($rs as $photo) {
                                    $file = JURI::root() . "images/joomgallery/originals/" . $photo->cat_name . '/' . $photo->filename;
                                    $fileInfo = pathinfo($file);
                                    if ($file) {
                                        $objFile = new stdClass();
                                        $objFile->file = $file;
                                        $objFile->title = $photo->title;
                                        $objFile->source = 'jgallery-' . $photo->cat_name;
                                        $sourcePhotos[] = $objFile;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 'phocagallery':
                    $phoca_catid = $params->get('phoca_catid', 0);
                    //nếu source là phoca
                    if (isset($phoca_catid)) {
                        $helper = new BTImageGalleryHelper();
                        if ($helper->checkPhocaComponent()) {
                            $rs = $helper->getPhocaPhotos($phoca_catid);
                            if (count($rs) > 0) {
                                foreach ($rs as $photo) {
                                    $file = JURI::root() . "images/phocagallery/" . $photo->filename;
                                    if ($file) {
                                        $objFile = new stdClass();
                                        $objFile->file = $file;
                                        $objFile->title = $photo->title;
                                        $objFile->source = 'phoca-' . $photo->cat_name;
                                        $sourcePhotos[] = $objFile;
                                    }
                                }
                            }
                        }
                       
                    }//end of phoca
				case 'ytlink':
					$ytLink = $params->get('yt_link', '');
					if($ytLink){
						$matches = array();
						if(preg_match('/v=(.+?)(&|$)/', $ytLink, $matches)){
							$videoid = JRequest::getString('video_id');
							$hashedName = md5($this->moduleID . '-youtube-' . $videoid);
							$filename = $hashedName . '.jpg';
							if (!JFile::exists($this->saveDir . '/tmp/manager' . $filename) && !JFile::exists($this->saveDir . '/manager' . $filename)) {
								$urlFeed = 'http://gdata.youtube.com/feeds/api/videos/' . $videoid;
								$ch = curl_init();
								curl_setopt($ch, CURLOPT_HEADER, 0);
								curl_setopt($ch, CURLOPT_URL, $urlFeed);
								curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
								$tmp = curl_exec($ch);
								curl_close($ch);
								@$videoInfo = simplexml_load_string($tmp);
								if($videoInfo){								
									$videoObj = new stdClass();
									$videoObj->file = 'http://img.youtube.com/vi/' . $videoid . '/0.jpg';
									$videoObj->title = (string) $videoInfo->title ;
									$videoObj->source = 'youtube';
									$videoObj->videoId = $videoid;
									$sourcePhotos[] = $videoObj;
									
								}
							}
						}else if(preg_match('/list=(.+?)(&|$)/', $ytLink, $matches)){
							$playlistId = JRequest::getString('playlist_id');
		
							$ch = curl_init();
							curl_setopt($ch, CURLOPT_HEADER, 0);
							curl_setopt($ch, CURLOPT_URL, 'http://gdata.youtube.com/feeds/api/playlists/' . $playlistId);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
							$tmp = curl_exec($ch);
							curl_close($ch);
							@$pl_info = simplexml_load_string($tmp);
							
							if ($pl_info) {
								$entries = $pl_info->entry;
								foreach ($entries as $entry) {
									$links = $entry->link;
									foreach ($links as $link) {
										if ($link['rel'] == "related") {
											$parser_link = explode("/", $link['href']);
											$videoid = $parser_link[count($parser_link) - 1];
											if ($videoid != "") {	
												$urlFeed = 'http://gdata.youtube.com/feeds/api/videos/' . $videoid;
												$ch = curl_init();
												curl_setopt($ch, CURLOPT_HEADER, 0);
												curl_setopt($ch, CURLOPT_URL, $urlFeed);
												curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
												$tmp = curl_exec($ch);
												curl_close($ch);
												@$videoInfo = simplexml_load_string($tmp);
												if($videoInfo){								
													$videoObj = new stdClass();
													$videoObj->file = 'http://img.youtube.com/vi/' . $videoid . '/0.jpg';
													$videoObj->title = (string) $videoInfo->title ;
													$videoObj->source = 'youtube';
													$videoObj->videoId = $videoid;
													$sourcePhotos[] = $videoObj;
													
												}
											}
										}
										
									}
								
								}
								
							}
						}
					}
                    break;
                default : break;
            }
            $addedPhotos = array();
            foreach ($sourcePhotos as & $photo1) {
                $photo1->pathInfo = $fileInfo = pathinfo($photo1->file);
                $hashedName = md5($moduleID . '-' .$photo1->source . '-' . $fileInfo['filename']);
                if (!JFile::exists($saveDir . "/manager/{$hashedName}.{$fileInfo["extension"]}")) {
                    $addedPhotos[] = $photo1;
                }
            }
            if ($params->get('get_limit')) {
                $addedPhotos = array_slice($addedPhotos, 0, $params->get('get_limit'));
            }
            $addedObjPhotos = array();
            foreach ($addedPhotos as $photo2) {
                $fileInfo = $photo2->pathInfo;
                $hashedName = md5($moduleID . '-' .$photo2->source . '-' . $fileInfo['filename']);
                $filename = "{$hashedName}.{$fileInfo["extension"]}";
                $objFile = new stdClass();
                if (copy($photo2->file, "{$saveDir}/original/{$filename}")) {
                    BTImageHelper::resize($saveDir . "/original/{$filename}", $saveDir . "/manager/{$filename}", 128, 96);
                    $objPhoto = new stdClass();
                    $objPhoto->file = $filename;
					$objPhoto->remote = $remote ? $photo2->file : '';
                    $objPhoto->title = $photo2->title;
                    $addedObjPhotos[] = $objPhoto;
                }
            }


            $photos = array_merge($photos, $addedObjPhotos);
            if ($syncType == 'sync') {
                // get photo existed
                $photoExisted = array();
                if (is_dir($managerPath)) {
                    $open = opendir($managerPath);
                    $arrFiles = array();
                    $filename = readdir($open);
                    while ($filename !== false) {
                        //check validated file
                        if (filetype($managerPath . '/' . $filename) == "file") {
                            $photoExisted[] = $filename;
                        }
                        $filename = readdir($open);
                    }
                }
                $deletedPhotos = array();
                foreach ($photoExisted as $photo3) {
                    $deleted = true;
                    foreach ($sourcePhotos as $sPhoto) {
						if(isset($sPhoto->pathInfo)) $fileInfo = $sPhoto->pathInfo;
						else $fileInfo = pathinfo($sPhoto->file);
                        
                        $hashedName = md5($moduleID . '-'. $sPhoto->source . '-' . $fileInfo['filename']);
                        $filename = "{$hashedName}.{$fileInfo["extension"]}";
                        if ($photo3 == $filename) {
                            $deleted = false;
                            break;
                        }
                    }
                    if ($deleted)
                        $deletedPhotos[] = $photo3;
                }
                $count = count($photos);
                for ($i = 0; $i < $count; $i++) {
                    if (in_array($photos[$i]->file, $deletedPhotos)) {
                        JFile::delete($saveDir . '/manager/' . $photos[$i]->file);
                        JFile::delete($saveDir . '/original/' . $photos[$i]->file);
                        //if (file_exists($saveDir . '/crop/' . $photos[$i]->file))
                            JFile::delete($saveDir . '/crop/' . $photos[$i]->file);
                        //if (file_exists($saveDir . '/thumbnail/' . $photos[$i]->file))
                            JFile::delete($saveDir . '/thumbnail/' . $photos[$i]->file);
                        unset($photos[$i]);
                    }
                }
                $photos = array_values($photos);
            }
            $params->set('gallery', base64_encode(json_encode($photos)));
            $table = JTable::getInstance('Module');
            $table->load($module->id);
            $table->set("params", (string) $params);
            $table->store();
            $dt->syncing = false;
            $dt->last_sync = time();
            $pt = fopen($syncFile, 'w+');
            fwrite($pt, json_encode($dt));
            fclose($pt);
        }
    }
}
