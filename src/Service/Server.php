<?php

/*
 * The Server class is the main class that handles the server side of the application.
 * It is responsible for processing the data and returning the response.
*/

namespace Questionaire\Service;

require_once __DIR__ . '/../../support/lib/vendor/autoload.php';

use Approach\Service\Service;
use Approach\Service\target;
use Approach\Service\format;
use Approach\Service\flow;

class Server extends Service
{
	public static $registrar = [];
    /**
     * @return array<int,array<string,array<string,string>>>
     * @param mixed $action
     */
    public static function Ran($action): array
	{
		return [[
			'REFRESH' => ['#content > div' => '<div>Ran</div>'],
		]];
	}

	public function __construct(
		flow $flow = flow::in,
		bool $auto_dispatch = false,
		?format $format_in = format::json,
		?format $format_out = format::json,
		?target $target_in = target::stream,
		?target $target_out = target::stream,
		$input = [Service::STDIN],
		$output = [Service::STDOUT],
		mixed $metadata = [],
		bool $register_connection = true
	) {

		self::$registrar['Questionaire']['Ran'] = function ($context) {
			return self::Ran($context);
        };
		parent::__construct($flow, $auto_dispatch, $format_in, $format_out, $target_in, $target_out, $input, $output, $metadata);
	}

	public function Process(?array $payload = null): void
	{
		$payload = $payload ?? $this->payload;

		$action = $payload[0]['support'];

		foreach ($payload[0] as $verb => $intent) {
			foreach ($intent as $scope => $instruction) {
				foreach ($instruction as $command => $context) {
					if ($command == 'Questionaire'){
						$this->payload = self::$registrar[$command][$context]($action);
					}
				}
			}
		}
	}
}
