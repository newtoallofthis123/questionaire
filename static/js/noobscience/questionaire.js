addScopeJS(["NoobScience", "Questionaire", "main"], {});
addScopeJS(["NoobScience", "Questionaire", "active"], {});

NoobScience.Questionaire.main = function(config = {}) {
    let $elf = this;

    $elf.config = {
        select: {
            selector: '#question',
        },
        selectParent: {
            selector: '#questions',
            children: '#questions>div'
        },
        start: {
            selector: '#start',
        }
    };
    overwriteDefaults(config, $elf.config);

    $elf.init = function() {
        $($elf.config.select.selector).each(function() {
            $(this).on('change', dispatch.onChange);
        })
        $($elf.config.selectParent.children).each(function() {
            $(this).on('change', dispatch.onChange);
        })
        $($elf.config.start.selector).on('click.start', dispatch.onStart);
    };

    // since we are not yet sure of the options, we will hard code them
    let options = {
        'coolness': {
            "options": [{
                'I am very cool': ['duration', 'salary']
            },
            { 'I am not cool': ['duration', 'salary'] },
            { 'I am not sure': ['duration', 'salary'] }
            ]
        },
        'duration': {
            "options": [{
                '1 year': ['salary']
            },
            { '2 years': ['salary'] },
            { '3 years': ['salary'] }
            ]
        },
        'salary': {
            "options": [{
                '100,000': []
            },
            { '200,000': [] },
            { '300,000': [] }
            ]
        }
    }

    let dispatch = {
        onChange: function() {
            // get the selector of the option selected
            let selected = $(this).val();
            // get the data attributes of the selected option
            let dataAttributes = $(this).find('option:selected').data('activate').split(';');

            $($elf.config.selectParent.children).empty();
            dataAttributes.map(function(attribute) {
                $($elf.config.selectParent.children).append(utilities.makeSelect(options[attribute]));
            });
        },
        onStart: function() {
            let select = $elf.config.selectParent.selector;
            // set display to block
            $(select).removeClass('hidden');
        }
    };

    let utilities = {
        makeOption: function(text, activates = []) {
            let ele = $('<option>').val(text).text(text)
            // add data-activate attribute to the option
            console.log(activates);
            if (activates.length > 0) {
                ele.attr('data-activate', activates.join(';'));
            }
            return ele;
        },
        makeSelect: function(options) {
            let select = $('<select>')
            let classes = ['border-2 ', 'border-gray-300 ', 'rounded-md ', 'w-full ', 'p-2 ', 'mt-3 '];
            classes.map(function(className) {
                select.addClass(className);
            });
            // options["options"].map(function(option) {
            //     console.log(Object.keys(option));
            //     select.append(utilities.makeOption(Object.keys(option)[0], option[Object.keys(option)[0]]));
            // });
            for (let i = 0; i < options["options"].length; i++) {
                let option = options["options"][i];
                select.append(utilities.makeOption(Object.keys(option)[0], option[Object.keys(option)[0]]));
            }
            return select;
        }
    }

    $elf.init();
    return $elf;
};

export let Questionaire = NoobScience.Questionaire.main;
