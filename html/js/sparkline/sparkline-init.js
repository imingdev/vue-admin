var Script = function () {
    $(".sparkline").each(function(){
        var $data = $(this).data();

        $data.valueSpots = {'0:': $data.spotColor};

        $(this).sparkline( $data.data || "html", $data,
            {
                tooltipFormat: '<span style="display:block; padding:0px 10px 12px 0px;">' +
                    '<span style="color: {{color}}">&#9679;</span> {{offset:names}} ({{percent.1}}%)</span>'
            });
    });


    //income expense progress bar

    $("#income").sparkline([5,6,7,5,9,6,4,9,8,5,6,7], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#fc8675'
    });

    $("#expense").sparkline([3,2,5,8,4,7,5,8,4,6], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#65cea7'
    });


    $("#expense2").sparkline([3,2,5,8,4,7,5,8,4,6], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#65cea7'
    });

    $("#pro-refund").sparkline([3,2,5,8,4,7,5,8,4,6], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#ffffff'
    });

    $("#p-lead-1").sparkline([7,5,9,6,4,9,8,5,6,7], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#65cea7'
    });

    $("#p-lead-2").sparkline([3,2,5,8,4,7,5,8,4,6], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#fc8675'
    });

    $("#p-lead-3").sparkline([3,2,5,8,4,7,5,8,4,6], {
        type: 'bar',
        height: '35',
        barWidth: 5,
        barSpacing: 2,
        barColor: '#5ab5de'
    });


    $("#visit-1").sparkline([5,6,7,9,9,5,3,2,4,6,7,5,6,8,7,9,5 ], {
        type: 'line',
        width: '100',
        height: '25',
        lineColor: '#55accc',
        fillColor: '#edf7f9'});

    $("#visit-2").sparkline([5,6,7,7,9,5,8,5,4,6,7,8,6,8,7,9,5 ], {
        type: 'line',
        width: '100',
        height: '25',
        lineColor: '#55accc',
        fillColor: '#edf7f9'});


}();