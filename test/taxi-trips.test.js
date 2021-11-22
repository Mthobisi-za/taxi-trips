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
                id: 1,
                reg_num: 'CA-081-050',
                starts_str: 'CA'
            },
            {
                id: 2,
                reg_num: 'CA-123-100',
                starts_str: 'CA'
            },
            {
                id: 3,
                reg_num: 'CA-410-070',
                starts_str: 'CA'
            }
        ];
        var dbdata = [
            { id: 7, reg_num: 'ND-081-050', starts_str: 'ND' },
            { id: 8, reg_num: 'ND-123-100', starts_str: 'ND' },
            { id: 9, reg_num: 'ND-410-070', starts_str: 'ND' }
        ];
        var gpdata = [{
                id: 4,
                reg_num: 'GP-081-050',
                starts_str: 'GP'
            },
            {
                id: 5,
                reg_num: 'GP-123-100',
                starts_str: 'GP'
            },
            {
                id: 6,
                reg_num: 'GP-410-070',
                starts_str: 'GP'
            }
        ];
        assert.deepStrictEqual(dbdata, await taxiTrips.findTaxisForRegion('Durban'));
        assert.deepStrictEqual(cpdata, await taxiTrips.findTaxisForRegion('Cape Town'));
        assert.deepStrictEqual(gpdata, await taxiTrips.findTaxisForRegion('Gauteng'));

    });

    it('should find all the trips for a reg number', async function() {

        const taxiTrips = TaxiTrips(pool);
        const cadata = [{
                fare: '10.00',
                id: 10,
                region_id: 2,
                routes_id: 2,
                taxi_id: 1
            },
            {
                fare: '15.00',
                id: 11,
                region_id: 2,
                routes_id: 3,
                taxi_id: 1
            },
            {
                fare: '9.00',
                id: 12,
                region_id: 2,
                routes_id: 1,
                taxi_id: 1
            }
        ]
        const gpdata = [{
                fare: '10.00',
                id: 25,
                region_id: 3,
                routes_id: 5,
                taxi_id: 6
            },
            {
                fare: '15.00',
                id: 26,
                region_id: 3,
                routes_id: 6,
                taxi_id: 6
            },
            {
                fare: '9.00',
                id: 27,
                region_id: 3,
                routes_id: 4,
                taxi_id: 6
            }
        ]
        assert.deepStrictEqual(cadata, await taxiTrips.findTripsByRegNumber('CA-081-050'));
        assert.deepStrictEqual(gpdata, await taxiTrips.findTripsByRegNumber('GP-410-070'));

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