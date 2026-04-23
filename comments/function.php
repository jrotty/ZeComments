
<?php
//头像源
function ZeComments_tx($mail,$type="mm",$uid=0){
    if($uid>0){
        $name = md5($uid);
        $path = \Typecho\Common::url(defined('__TYPECHO_UPLOAD_DIR__') ? __TYPECHO_UPLOAD_DIR__ : \Widget\Upload::UPLOAD_DIR,
        defined('__TYPECHO_UPLOAD_ROOT_DIR__') ? __TYPECHO_UPLOAD_ROOT_DIR__ : __TYPECHO_ROOT_DIR__) . '/avatar/';
    
        if(defined('__TYPECHO_UPLOAD_DIR__')){$udir= __TYPECHO_UPLOAD_DIR__ ;}else{ $udir= \Widget\Upload::UPLOAD_DIR;}
        $file1=$path.$name.'.webp';
        $file2=$path.$name.'.jpg';
        if(file_exists($file1)){
            $img=Helper::options()->rootUrl.$udir."/avatar/".$name.'.webp?'.filemtime($file1);
            return $img;
        }elseif(file_exists($file2)){
            $img=Helper::options()->rootUrl.$udir."/avatar/".$name.'.jpg?'.filemtime($file2);
            return $img;
        }else{
            ZeComments_tx($mail,$type);
        }
    }

    if (defined('__TYPECHO_GRAVATAR_PREFIX__')) {
        $url = __TYPECHO_GRAVATAR_PREFIX__;} 
        elseif(Helper::options()->gravatars) {
        $url= Helper::options()->gravatars;
        }else{
        $url = 'https://cravatar.cn/avatar/';
        }
    return $url.md5($mail).'?s=80&d='.$type;
}


//评论@函数
function ZeComments_at($coid)
{
    $db   = Typecho_Db::get();
    $prow = $db->fetchRow($db->select('parent')->from('table.comments')
                                 ->where('coid = ?', $coid));
    $parent = $prow['parent'];
    if (!empty($parent)) {
        $arow = $db->fetchRow($db->select('author')->from('table.comments')
                                     ->where('coid = ? AND status = ?', $parent, 'approved'));
if(!empty($arow['author'])){ $author = $arow['author'];
        $href   = '<a href="#comment-' . $parent . '">@' . $author . '</a> ';
        return $href;
}else { return '';}
    } else {
        return '';
    }
}

function ZeComments_Timesince($time,$type = false) {
    if (!empty(Helper::options()->tools) && in_array('dateformat', Helper::options()->tools)){
    return date('Y年m月d日' , $time);
    }else{
    $text = '';
        $time = $time === NULL || $time > time() ? time() : intval($time);
        $t = time() - $time; //时间差 （秒）
        $y = date('Y', $time)-date('Y', time());//是否跨年
        if($type=="day"){
        switch($t){
         case $t == 0:
           $text = '刚刚';
           break;
         case $t < 60:
          $text = $t . '秒前'; // 一分钟内
          break;
         case $t < 60 * 60:
          $text = floor($t / 60) . '分钟前'; //一小时内
          break;
         case $t < 60 * 60 * 24:
          $text = floor($t / (60 * 60)) . '小时前'; // 一天内
          break;
         case $t < 60 * 60 * 24 * 3:
          $text = floor($time/(60*60*24)) ==1 ?'昨天 ' : '前天 '; //昨天和前天
          break;
         default:
          $text = floor($t/(60*60*24)).'天前'; //一个月内
          break;
        }
        }else{
        switch($t){
         case $t == 0:
           $text = '刚刚';
           break;
         case $t < 60:
          $text = $t . '秒前'; // 一分钟内
          break;
         case $t < 60 * 60:
          $text = floor($t / 60) . '分钟前'; //一小时内
          break;
         case $t < 60 * 60 * 24:
          $text = floor($t / (60 * 60)) . '小时前'; // 一天内
          break;
         case $t < 60 * 60 * 24 * 3:
          $text = floor($time/(60*60*24)) ==1 ?'昨天 ' : '前天 '; //昨天和前天
          break;
         case $t < 60 * 60 * 24 * 30:
          $text = floor($t/(60*60*24)).'天前'; //一个月内
          break;
         case $t < 60 * 60 * 24 * 365&&$y==0:
          $text = date('m月d日', $time); //一年内
          break;
         default:
          $text = date('Y年m月d日', $time); //一年以前
          break;
        }
    }
    return $text;}
    }


function ZeComments_parsePaopaoBiaoqingCallback($match)
    {
        return '<svg class="biaoqing"><use xlink:href="'.Ze_themeUrl.'comments/img/coolapk_emoji.svg#'. htmlspecialchars($match[1]) . '"></use></svg>';
    }
function ZeComments_parseBiaoQing($content)
    {
        $content = preg_replace_callback('/\:\:\(\s*(doge原谅他|挨打|傲慢|白眼|悲伤面具|鄙视|侧眼|吃瓜|臭美|呲牙|大哭|大怒|盯|斗鸡眼滑稽|二哈|发呆|发怒|尴尬|高歌|狗头|狗头笑哭|哈哈哈|害羞|汗|好戏滑稽|喝茶|和善|嘿哈|滑稽|坏笑|欢呼|机智|惊讶|开搞|开心|开心面具|看|可怜|抠鼻|酷|流汗滑稽|卖萌|萌新|喵喵|耐克嘴|难过|牛啤|胖次滑稽|喷|喷血|撇嘴|悄咪咪|亲亲|色|受虐滑稽|睡|痛饮|吐舌|托腮|哇|微微笑|微笑滑稽|委屈|我最美|无奈|无语|捂脸|捂嘴笑|笑哭|笑喷|笑眼|羞羞|耶|疑问|阴暗|阴险|圆脸狗头|再见|皱眉|装酷滑稽)\s*\)/is',
'ZeComments_parsePaopaoBiaoqingCallback', $content);
        return $content;
    }
      
?>