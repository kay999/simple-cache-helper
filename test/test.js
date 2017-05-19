const expect = require('expect.js');
const Cache = require('../index');

describe('sync-cache', function() {
	it('should work', function() {
		var num = 1;
		const c1 = Cache.Sync(function(id) {
			if (id === 4) return undefined;
			return { id:id, value:'i'+num++ }
		});

		expect(c1.get()).to.be(undefined);
		expect(c1.get(1)).to.eql({ id:1, value:'i1' });
		expect(c1.get(2)).to.eql({ id:2, value:'i2' });
		expect(c1.get(1)).to.eql({ id:1, value:'i1' });
		expect(c1.check(1)).to.be(true);
		expect(c1.check(3)).to.be(false);
		expect(c1.check(4)).to.be(false);
		expect(c1.get(4)).to.be(undefined);
		expect(c1.getAll()).eql({
			'1': { id: 1, value: 'i1' },
			'2': { id: 2, value: 'i2' },
			'4': undefined
		});

		c1.remove(1);
		expect(c1.get(1)).to.eql({ id:1, value:'i3' });		// should be recreated now with num == 3
		expect(c1.get(2)).to.eql({ id:2, value:'i2' });

		c1.clear();
		expect(c1.get(2)).to.eql({ id:2, value:'i4' });
		expect(c1.get(1)).to.eql({ id:1, value:'i5' });		// should be recreated now with num == 4
	});
});

describe('async-cache', function() {
	it('should work', function() {
		var num = 1;
		const c1 = Cache.Async(function(id) {
			if (id === 4) return undefined;
			if (id === 3) return { id:id, value:'three' };
			return Promise.resolve({ id:id, value:'i'+num++ });
		});

		return c1.get().then(function (v) {
			expect(v).to.be(undefined);
		}).then(function () {
			return c1.get(1).then(function (v) {
				expect(v).to.eql({id: 1, value: 'i1'});
			})
		}).then(function () {
			return c1.get(2).then(function (v) {
				expect(v).to.eql({ id:2, value:'i2' });
			})
		}).then(function () {
			return c1.get(1).then(function (v) {
				expect(v).to.eql({ id:1, value:'i1' });
			})
		}).then(function () {
			expect(c1.check(1)).to.be(true);
			expect(c1.check(3)).to.be(false);
			expect(c1.check(4)).to.be(false);
		}).then(function () {
			return c1.get(3).then(function (v) {
				expect(v).to.eql({ id:3, value:'three' });
			})
		}).then(function () {
			return c1.get(4).then(function (v) {
				expect(v).to.be(undefined);
			})
		})/*.then(function () {
			expect(c1.getAll()).to.eql({
				'1': { id: 1, value: 'i1' },
				'2': { id: 2, value: 'i2' },
				'3': { id: 3, value: 'three' },
				'4': undefined
			});
		})*/.then(function () {
			c1.remove(1);
			return c1.get(1).then(function (v) {
				expect(v).to.eql({ id:1, value:'i3' });
			})
		}).then(function () {
			return c1.get(2).then(function (v) {
				expect(v).to.eql({ id:2, value:'i2' });
			})

		}).then(function () {
			c1.clear();
			return c1.get(2).then(function (v) {
				expect(v).to.eql({ id:2, value:'i4' });
			})
		}).then(function () {
			return c1.get(1).then(function (v) {
				expect(v).to.eql({ id:1, value:'i5' });
			})
		});
	});
});

