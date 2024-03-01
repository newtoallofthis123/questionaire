addScopeJS(["NoobScience", "Questionaire", "main"], {});
addScopeJS(["NoobScience", "Questionaire", "active"], {});

NoobScience.Questionaire.main = function(config = {}) {
    let $elf = this;

    $elf.config = {
        tabs: {
            selector: '#tabs',
        },
        tabBtn: {
            selector: '.tabBtn',
        },
        start: {
            selector: '#start',
        }
    };
    overwriteDefaults(config, $elf.config);

    $elf.init = function() {
        $($elf.config.tabs.selector).children().hide()
        $($elf.config.tabBtn.selector).hide()

        let tabBtns = $($elf.config.tabBtn.selector);
        for (let i = 0; i < tabBtns.length; i++) {
            if ($(tabBtns[i]).data('enable-default') == "on") {
                $(tabBtns[i]).show();
                break;
            }
        }

        $(`${$elf.config.tabBtn.selector}`).on('click.tabChange', dispatch.tabChange);

        // any select in the children of the tabs, will trigger the onChange event 
        $($elf.config.tabs.selector).children().find('select').on('change.onChange', dispatch.onChange);

        $($elf.config.start.selector).on('click.start', dispatch.onStart);
    };

    let dispatch = {
        tabChange: function() {
            let target = $(this).data('enable');
            let select = $elf.config.tabs.selector;
            $(select).children().hide();
            $(`#${target}`).show();
        },
        onChange: function() {
            let raw_targets = $(this).find('option:selected').first().data('activate');
            let targets = JSON.parse(JSON.stringify(raw_targets));
            // targets.push($(this).parent().attr('id')); // this sort of fixes some stuff
            let select = $elf.config.tabs.selector;
            let tabs = Array.from($(select).children())
            for (let i = 0; i < tabs.length; i++) {
                $(tabs[i]).hide();
            }
            $(this).parent().show();
            for (let i = 0; i < targets.length; i++) {
                $(`${$elf.config.tabBtn.selector}[data-enable="${targets[i]}"]`).show();
            }
        },
        onStart: function() {
            let select = $elf.config.tabs.selector;
            $(select).show();
        }
    };

    $elf.init();
    return $elf;
};

export let Questionaire = NoobScience.Questionaire.main;
