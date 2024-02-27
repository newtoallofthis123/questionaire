<?php

namespace Questionaire;

use Approach\Render\HTML;
// use Questionaire\Render\Intent;

global $body;
require_once __DIR__ . '/support/lib/vendor/autoload.php';

require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/head.php';

$body[] = $main = new HTML(tag: 'main', classes: ['p-2 ']);
$main[] = new HTML(tag: 'h1', classes: ['text-4xl ', 'font-bold ', 'text-center'], content: 'ML Questionaire');
$main[] = new HTML(tag: 'p', classes: ['text-center ', 'pt-3 ', 'text-lg'], content: 'Welcome to the The Syndicate\'s ML Questionaire. Please answer the following questions.'); 

$main[] = $controls = new HTML(tag: 'div', classes: ['flex ', 'flex-col ', 'justify-center ', 'items-center ', 'controls']); 
// $controls[] = new Intent(tag: 'button', classes: ['border-0 ', 'rounded-md ', 'bg-lime-400 ', 'p-2 ', 'mt-3 ', 'w-2/5 '], api: '/server.php', method: 'POST',
//     intent: ['REFRESH' => ['Questionaire' => 'Ran']],
//     context: ['_response_target' => '#content > div'],
//     content: 'Start'
// );
$controls[] = new HTML(tag: 'button', classes: ['border-0 ', 'rounded-md ', 'bg-lime-400 ', 'p-2 ', 'mt-3 ', 'w-2/5 '], content: 'Start', attributes: ['id' => 'start', 'data-action' => 'start.questionaire']);
$main[] = $content = new HTML(tag: 'div', attributes: ['id' => 'content'], classes: ['flex ', 'flex-col', 'justify-center ', 'items-center ', 'gap-3 ', 'mt-3']);
$content[] = new HTML(tag: 'p', attributes: ['id' => 'question_text'], classes: ['text-center ', 'pt-3 ', 'text-lg ', 'w-1/5'], content: 'Click start to begin the questionaire.');

$select = new HTML(tag: 'select', classes: ['border-2 ', 'border-gray-300 ', 'rounded-md ', 'p-2 ', 'w-3/5 ', 'mt-3 '], attributes: ['name' => 'question', 'id' => 'question']);

$content[] = $select;
$content[] = new HTML(tag: 'button', classes: ['border-0 ', 'rounded-md ', 'bg-red-400 ', 'p-2 ', 'mt-3 ', 'w-1/5 '], content: 'Submit', attributes: ['id' => 'start']);
