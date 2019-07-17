$(function () {

	$('.collapsable').each(function () {

		let toggle = $(this).find(".collapse-toggle");
		let target = $(this).find(".collapse-target");

		toggle.on("click", function () {

			target.toggleClass('collapsed');
			
		});

		toggle.trigger('click');

	})

});