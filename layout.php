<?php

namespace Questionaire;

require_once __DIR__ . '/support/lib/vendor/autoload.php';

use Approach\Render\HTML;

$webpage = new HTML(tag: 'html');
$webpage->before = '<!DOCTYPE html>' . PHP_EOL;

$head = new HTML(tag: 'head');
$head[] = $pageTitle = new HTML(tag: 'title', content: 'Questionaire');	

$body = new HTML(tag: 'body', classes: ['Interface']);

$webpage[] = $head;
$webpage[] = $body;
