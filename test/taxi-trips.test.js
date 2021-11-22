let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:mthobisi@localhost:5432/users';

const pool = new Pool({
    connectionString,
    ssl: false
});

describe('Taxi Trips', function() {

    // beforeEach(async function () {

    // });
    it('should find how many trips all the taxis made', async function() {
        const taxiTrips = TaxiTrips(pool);
        var data = [{ count: 27 }]
        assert.deepEqual(data, await taxiTrips.totalTripCount());
    });

    it('should find all the regions', async function() {

        const taxiTrips = TaxiTrips(pool);
        var data = [{
            name_of_region: 'Durban'
        }, {
            name_of_region: 'Cape Town'
        }, {
            name_of_region: 'Gauteng'
        }]
        assert.deepStrictEqual(data, await taxiTrips.findAllRegions());

    });

    it('should find all the taxis for a region', async function() {
        const taxiTrips = TaxiTrips(pool);
        var cpdata = [{
                reg_num: 'CA-081-050',
                starts_str: 'CA'
            },
            {
                reg_num: 'CA-123-100',
                starts_str: 'CA'
            },
            {
                reg_num: 'CA-410-070',
                starts_str: 'CA'
            }
        ];
        var dbdata = [
            { reg_num: 'ND-081-050', starts_str: 'ND' },
            { reg_num: 'ND-123-100', starts_str: 'ND' },
            { reg_num: 'ND-410-070', starts_str: 'ND' }
        ];
        var gpdata = [{
                reg_num: 'GP-081-050',
                starts_str: 'GP'
            },
            {
                reg_num: 'GP-123-100',
                starts_str: 'GP'
            },
            {
                reg_num: 'GP-410-070',
                starts_str: 'GP'
            }
        ];
        assert.deepEqual(dbdata, await taxiTrips.findTaxisForRegion('Durban'));
        assert.deepEqual(cpdata, await taxiTrips.findTaxisForRegion('Cape Town'));
        assert.deepEqual(gpdata, await taxiTrips.findTaxisForRegion('Gauteng'));

    });

    it('should find all the trips for a reg number', async function() {

        const taxiTrips = TaxiTrips(pool);
        const cadata = [{
                fare: '10.00',
                "regnum": "CA-081-050"
            },
            {
                fare: '15.00',
                "regnum": "CA-081-050"
            },
            {
                fare: '9.00',
                "regnum": "CA-081-050"
            }
        ]
        const gpdata = [{
                fare: '10.00',
                "regnum": "GP-410-070"
            },
            {
                fare: '15.00',
                "regnum": "GP-410-070"
            },
            {
                fare: '9.00',
                "regnum": "GP-410-070"
            }
        ]
        assert.deepEqual(cadata, await taxiTrips.findTripsByRegNumber('CA-081-050'));
        assert.deepEqual(gpdata, await taxiTrips.findTripsByRegNumber('GP-410-070'));

    });

    it('should find the total number of trips by region', async function() {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual(9, (await taxiTrips.findTripsByRegion('Cape Town')).length);
        assert.deepStrictEqual(9, (await taxiTrips.findTripsByRegion('Gauteng')).length);
        assert.deepStrictEqual(9, (await taxiTrips.findTripsByRegion('Gauteng')).length);

    });

    it('find the total income for a given reg number', async function() {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual('34.00', (await taxiTrips.findIncomeByRegNumber('CA-081-050'))[0].income);
        assert.deepStrictEqual('34.00', (await taxiTrips.findIncomeByRegNumber('ND-410-070'))[0].income);
    });

    it('find the total income for each taxi', async function() {

        const taxiTrips = TaxiTrips(pool);
        var data = [{
                income: '34.00',
                regnum: 'CA-081-050'
            },
            {
                income: '34.00',
                regnum: 'CA-123-100'
            },
            {
                income: '34.00',
                regnum: 'CA-410-070'
            },
            {
                income: '34.00',
                regnum: 'GP-081-050'
            },
            {
                income: '34.00',
                regnum: 'GP-123-100'
            },
            {
                income: '34.00',
                regnum: 'GP-410-070'
            },
            {
                income: '34.00',
                regnum: 'ND-081-050'
            },
            {
                income: '34.00',
                regnum: 'ND-123-100'
            },
            {
                income: '34.00',
                regnum: 'ND-410-070'
            }
        ]
        assert.deepStrictEqual(data, await taxiTrips.findTotalIncomePerTaxi());

    });

    it('find the total income for all the taxis', async function() {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual('306.00', (await taxiTrips.findTotalIncome())[0].income);
    });



    after(function() {
        pool.end();
    });

});