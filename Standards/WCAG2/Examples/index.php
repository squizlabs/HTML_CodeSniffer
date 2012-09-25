<ol>
<?php

$dir = dirname(__FILE__);
$files = glob($dir.'/*.html');

foreach ($files as $file) {
    $file = basename($file);
    echo '<li><a href="'.$file.'">'.$file.'</a></li>';
}

?>
</ol>
