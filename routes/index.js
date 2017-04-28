var express = require('express'),
    is_production = (process.env.NODE_ENV === "prod"),
    key, routes,
    extend = require('util')._extend,
    router = express.Router(),
    util = require('./util'),
    global = require('./global_constant'),
    careers = global.careers,
    api_token = is_production ? '54176021ae0ea7b8ff491117883b0778' : 'f5fc3e38a7e2d9722e65aabc92aaaa5a',
    domain = is_production ? '//idyllic.co:8010/' : '//localhost:8001/';

routes = {
    home: {
        url: '/',
        asset_path: 'index.html',
        page_data: {
            page_type: 'home',
            menu_title: 'Idyllic'
        },
        global_data: {
            our_virtues: global.our_virtues,
            vimeo_video: global.vimeo_video
        }
    },
    web_dev: {
        url: '/web-development',
        asset_path: './studio/web-dev.html',
        page_data: {
            menu_title: 'Studio',
            page_type: 'studio'
        },
        beforeLoad: function (configs) {
            configs.web_dev_stories = util.sortStories(util.get_random(global.web_dev_stories, 2));
            configs.web_team = util.get_random_all(global.team.web_team);
            configs.fact = util.get_random(global.facts.web_dev);
        }
    },
    mobile_dev: {
        url: '/mobile-development',
        asset_path: './studio/mobile-dev.html',
        page_data: {
            menu_title: 'Studio',
            page_type: 'studio'
        },
        beforeLoad: function (configs) {
            configs.mobile_dev_stories = util.sortStories(util.get_random(global.mobile_dev_stories, 3));
            configs.mobile_team = util.get_random_all(global.team.mobile_team);
            configs.fact = util.get_random(global.facts.mobile_dev);
        }
    },
    user_experience: {
        url: '/user-experience',
        asset_path: './studio/user-experience.html',
        page_data: {
            menu_title: 'Studio',
            page_type: 'studio'
        },
        beforeLoad: function (configs) {
            configs.design_dev_stories = util.sortStories(util.get_random(global.design_dev_stories, 3));
            configs.fact = util.get_random(global.facts.ux_dev);
        }
    },
    about_us: {
        url: '/about-us',
        asset_path: './studio/about-us.html',
        page_data: {
            menu_title: 'Studio',
            page_type: 'studio'
        },
        global_data: {
            our_values: global.our_values,
            core_team: global.team.core_team,
            facts: global.facts.about_us
        }
    },
    creates: {
        url: '/design-led-development-case-studies',
        asset_path: 'creates.html',
        page_data: {
            menu_title: 'Creates',
            page_type: 'creates'
        },
        global_data: {
            clients: global.clients
        }
    },
    // stories: { // stories are loading from wordpress so hardcoded commented code here
    //     url: '/stories',
    //     asset_path: 'stories.html',
    //     page_data: {
    //         menu_title: 'Stories',
    //         page_type: 'stories'
    //     },
    //     global_data: {
    //         design_dev_stories: util.sortStories(global.design_dev_stories),
    //         mobile_dev_stories: util.sortStories(global.mobile_dev_stories),
    //         web_dev_stories: util.sortStories(global.web_dev_stories)
    //     }
    //},
    // stories_detail: {
    //     url: '/stories/1',
    //     asset_path: 'stories_detail.html',
    //     page_data: {
    //         menu_title: '',
    //         page_type: 'stories_detail',
    //         hide_menu_title: true,
    //         back_navigation: true,
    //         back_navigation_title: 'Story Title',
    //         back_page_path: '/stories',
    //         back_page_name: 'Stories'
    //     }
    // },
    careers: {
        url: '/careers',
        asset_path: 'careers.html',
        page_data: {
            menu_title: 'Join us',
            page_type: 'careers'
        },
        global_data: {
            careers: careers,
            work_at_idyllic: global.work_at_idyllic,
            management_team: global.team.management_team
        }
    },
    ruby_on_rails_tech: {
        url: '/ruby-on-rails-development',
        asset_path: './tech/ruby_on_rails.html',
        page_data: {
            menu_title: 'Ruby on Rails',
            page_type: 'tech',
            back_navigation_title: 'Ruby on Rails',
            back_navigation: true,
            back_page_path: '/web-development',
            back_page_name: 'Web Dev'
        },
        global_data: {
            clients: global.clients
        }
    },
    teliax_studies: {
        url: '/scalable-ruby-case-study/toll-free-exchange',
        asset_path: './case_studies/toll-free-exchange.html',
        page_data: {
            menu_title: '<div class="heading-logo-wrap"><div class="sprt toll-free-icon"></div></div>',
            page_type: 'case_studies',
            back_navigation_title: 'Toll Free Exchange',
            back_navigation: true,
            back_page_path: '/design-led-development-case-studies',
            back_page_name: 'Creates'
        }
    },
    bridj_case_studies: {
        url: '/ruby-on-rails-and-mobile-case-study/bridj',
        asset_path: './case_studies/bridj.html',
        page_data: {
            menu_title: '<div class="heading-logo-wrap bridj-icon"><div class="sprt bridj-icon-red"></div></div>',
            page_type: 'case_studies',
            back_navigation_title: 'Bridj',
            back_navigation: true,
            back_page_path: '/design-led-development-case-studies',
            back_page_name: 'Creates'
        }
    },
    fankave_case_studies: {
        url: '/user-experience-design-case-study/fankave',
        asset_path: './case_studies/fankave.html',
        page_data: {
            menu_title: '<div class="heading-logo-wrap fankave-icon"><div class="sprt fankave-icon-white"></div></div>',
            page_type: 'case_studies',
            back_navigation_title: 'Fankave',
            back_navigation: true,
            back_page_path: '/design-led-development-case-studies',
            back_page_name: 'Creates'
        }
    }
};

for(key in careers){
    careers[key].forEach(function (career) {
        routes["career_" + career.id] = {
            url: '/careers/' + career.path,
            asset_path: 'career_detail.html',
            page_data: {
                menu_title: career.title,
                page_type: 'career_detail',
                back_navigation_title: career.title,
                hide_menu_title: true,
                back_navigation: true,
                back_page_path: '/careers',
                back_page_name: 'Careers'
            },
            global_data: {
                details: career
            }
        }
    });
}

var paths = {
    'stories_path': '/blog' // stories are loading from wordpress so hardcoded path here.
};
for(key in routes){
    paths[key + '_path'] = routes[key].url;
}

for(key in routes){
    (function(route, name){
        var configs = {
            page: {
                name: name,
                body_cls: name + '_page',
                js_data: {
                    baseUrl: domain,
                    apiKey: api_token
                }
            },
            paths: paths,
            is_production: is_production,
            contact_us_tags: global.contact_us_tags
        };
        extend(configs.page, route.page_data);

        if(route.hasOwnProperty('global_data')) {
            extend(configs, route.global_data);
        }

        router.get(route.url, function(req, res) {
            if(route.hasOwnProperty('beforeLoad')){
                route.beforeLoad(configs);
            }
            res.render(route.asset_path, configs);
        });

    })(routes[key], key);
}

router.get('/facts', function(req, res) {
    res.send({
        success: true,
        facts: global.facts
    });
});

module.exports = router;
