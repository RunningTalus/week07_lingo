var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Leg = mongoose.model('Leg',
	{position:String}
	);

var Dog = mongoose.model('Dog',
    { 
	    name: String,
	    weight: Number,
	    age: Number,
	    legs: [mongoose.Schema.Types.ObjectId]
	}
);

var banksy = {};

Dog.findOne({name:"Banksy"}, function(err,data){
	if (data){
		banksy = data;
	}
	else {
		banksy = new Dog(
			{
				name:"Banksy",
				weight: 45,
				age: 3,
				legs:[
					new Leg({position:"frontLeft"}),
					new Leg({position:"frontRight"}),
					new Leg({position:"rearLeft"}),
					new Leg({position:"rearRight"})
				 	]
			}
		);
		banksy.save();
	}
	console.log(banksy);
	console.log(banksy.legs[0].position);
});

