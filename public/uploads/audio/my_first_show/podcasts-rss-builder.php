<?php
header('Content-Type: text/xml');
$feedName = "My first Show";
$feedDesc = "Aliquam aliquam ante risus, sed porta mauris tempus vel. Integer molestie luctus mauris, hendrerit tincidunt libero sollicitudin nec. 
Proin sit amet neque sed sapien mattis lobortis. Aliquam volutpat convallis dapibus.";
$feedURL = "https://rewind.radio/myfirstshow";
$feedBaseURL = "https://rewind.radio/public/audio/myfirstshow/"; // must end in trailing forward slash (/).
$feedAuthor = "Jaden Moreno, Julia Cruz";

$allowed_ext = ".mp4,.MP4,.mp3,.MP3";
$tz = 'America/New_York';
$timestamp = time();
$dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
$dt->setTimestamp($timestamp); //adjust the object to correct timestamp

// Générer le contenu du fichier XML ou RSS
$content = "<" . "?" . "xml version=\"1.0\" " . "?" . ">\n";
$content .= "  <rss xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:content=\"http://purl.org/rss/1.0/modules/content/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:itunes=\"http://www.itunes.com/dtds/podcast-1.0.dtd\" xmlns:spotify=\"https://www.spotify.com/ns/rss\" version=\"2.0\" xml:base=\"http://rewind.radio\">\n";
$content .= "<channel>\n";
$content .= "<language>en-us</language>\n";
$content .= "<copyright>Copyright &copy; ". date("Y") ." RewinRadio</copyright>\n";
$content .= "<atom:link href=\"" . $feedBaseURL . "\" rel=\"self\" type=\"application/rss+xml\" />\n";
$content .= "<link>" . $feedURL . "</link>\n";
$content .= "<title>" . $feedName . "</title>\n";
$content .= "<author>" . $feedAuthor . "</author>\n";
$content .= "<pubDate>". $dt->format('D, d M Y G:i:s O')."</pubDate>\n"; 
$content .= "<image>\n";
$content .= "<url>http://rewind.radio/public/audio/my_first_show/cover.jpg</url>\n";
$content .= "<link>http://rewind.radio/</link>\n";
$content .= "</image>\n";
$content .=" <description>" . $feedDesc . "</description>\n";

$files = [];
$dir = opendir("./");

while (($file = readdir($dir)) !== false) {
  $path_info = pathinfo($file);
  $ext = strtoupper($path_info['extension']);

  if ($file !== '.' && $file !== '..' && !is_dir($file) && strpos($allowed_ext, $ext) > 0) {

    $files[] = ['name' => $file, 'timestamp' => filectime($file), 'duration' => filesize($file)];
  }
}
closedir($dir);

//sort by col name
usort($files, fn($item, $compare) => $item['name'] >= $compare['name']);

//reindex
$files = array_values(array_filter($files));

//build feed 
for ($i = 0; $i < count($files); $i++) {
  if ($files[$i] != "index.php") {
    if (!empty($files[$i]['name'])) {
      $new_file = $files[$i]['name'];
      $x = substr($new_file, 0, strrpos($new_file, '.'));
      $content .= "<item>\n";
      $content .= "<title>" . $x . "</title>\n";
      $content .= "<enclosure url='" . $feedBaseURL . $files[$i]['name'] . "' length='" . $files[$i]['duration'] . "' type='audio/mpeg' />\n";
      $content .= "<guid>" . $feedBaseURL . $files[$i]['name'] . "</guid>\n";
      $content .= "<pubDate>" . date("D, d M Y H:i:s T", $files[$i]['timestamp']) . "</pubDate>\n";
      $content .= "</item>\n";
    }
  }
}

$content .= "</channel>\n";
$content .= "</rss>";

// Écrire le contenu dans un fichier
$feedNameLowerCase = strtolower(str_replace(' ','_',$feedName));
file_put_contents("../../../public/audio/". $feedNameLowerCase."/". $feedNameLowerCase .".xml", $content);
