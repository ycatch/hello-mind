var num_pattern = [1, 3, 7];
var weight_pattern = [1.6, 1.3, 1.0];
var word_array = [];
var key = [];

$(function() {
	$("#result_title").hide();
	$("#result").hide();
	$("#input_form").hide();

	//key[0] = key phrase;
	key = location.search.substr(1).split("&");

    if (key[0] != "") {
		var title = decodeURI(key[0]) + " さんのココロは...";
		document.title = title;
		$("#result_title p").html(title);
		$("#result_title").show();
		buildMessage(key[0] + key[1]);
		$("#result").fadeIn("slow");
    } else {
		$("#input_form").show();
	}

    $('#check').click(function(e) {
        var phrase = $("#key_phrase").val();
        if (phrase == "") {
            $("#key_phrase").attr("placeholder", "もう一度、入力.")
        } else {
			jumpPage('index.html?' + phrase);
        }
    });

    $('#clear').click(function(e) {
        jumpPage('index.html');
    });

	$('.social-likes').socialLikes({
    	title: document.title
	});
});

var buildMessage = function(key) {
	var len = mind_word.length;
	var mind_hush = crc.dec(key).toString(10);

	genMindHush(mind_hush, 0, 3, 0.4);
	genMindHush(mind_hush, 3, 3, 0.2);
	genMindHush(mind_hush, 6, 4, 0);
};

var genMindHush = function(mh, start, len, w) {
	// w is font weight, same word another weight
	var num = mind_word.length;

	var mh_s = Number(mh.substr(start, len));
	var mkey = mind_word[mh_s % num];

	var count = num_pattern[mh_s % 3];
	var weight = weight_pattern[mh_s % 3] + w;
	var obj = {text: mkey, weight: weight};

	for (var i = 0; i < count; i++) {
		word_array.push(obj);
		//console.log(obj);
	}

	$("#wordcloud").jQCloud(word_array, {
		width: 190,
		height: 205,
		center: {
			x: 135,
			y: 113
		}
	});
};

var jumpPage = function(e) {
	//console.log("jumpPage: " + e);
	window.location.href = e;
}
