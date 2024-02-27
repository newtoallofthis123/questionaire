addScopeJS(["NoobScience", "Questionaire", "main"], {});
addScopeJS(["NoobScience", "Questionaire", "active"], {});

NoobScience.Questionaire.main = function(config = {}) {
    let $elf = this;

    $elf.config = {
        select: {
            selector: '#question',
        },
        start: {
            selector: '#start',
        }
    };
    overwriteDefaults(config, $elf.config);

    $elf.init = function() {
        $(config.select.selector).on('change.questionaire', $elf.dispatch.onChange);
        $(config.start.selector).on('click.start', $elf.dispatch.onStart);
    };

    $elf.dispatch = {
        onChange: function() {
            console.log("Change");
        },
        onStart: function() {
            console.log("Start");
        }
    };
};

export let Questionaire = new NoobScience.Questionaire.main;
