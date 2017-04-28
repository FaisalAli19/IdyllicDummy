var randomIndex = function(len){
        return Math.floor(Math.random() * len);
    }, _util;


_util = {
    get_random: function(data, count){
        if(count && count >= 1) {
            var arr = [],
                len = data.length,
                indexHash = {};
            if(count >= len){
                return data;
            }
            while(1){
                var index = randomIndex(len);
                if(arr.length == count){
                    break;
                }
                if(!indexHash.hasOwnProperty(index) && index < len){
                    indexHash[index] = true;
                    arr.push(data[index]);
                }
            }
            return arr;
        }else {
            return data[randomIndex(data.length)] || data[0];
        }
    },

    get_random_all: function (data) {
        var arr = [],
            len = data.length,
            indexHash = {};

        while(1){
            var index = randomIndex(len);
            if(arr.length == len){
                break;
            }
            if(!indexHash.hasOwnProperty(index) && index < len){
                indexHash[index] = true;
                arr.push(data[index]);
            }
        }
        return arr;
    },
    
    sortStories: function (data) {
        return data.sort(function (a, b) {
            return !a.image_present
        })
    }
};

module.exports = _util;