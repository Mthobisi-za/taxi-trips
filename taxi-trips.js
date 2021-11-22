module.exports = function(pool) {

    async function totalTripCount() {
        var data = (await pool.query(`select count(taxi_id )as count from trip`)).rows
        return data
    }
    async function findAllRegions() {
        var data = (await pool.query(`select name_of_region  from region`)).rows
        return data
    }
    async function findTaxisForRegion(region) {
        if (region == 'Durban') {
            var data = (await pool.query(`select reg_num,starts_str from taxi where starts_str = $1`, ['ND'])).rows
            return data
        } else if (region == 'Cape Town') {
            var data = (await pool.query(`select reg_num,starts_str from taxi where starts_str = $1`, ['CA'])).rows
            return data
        } else if (region == 'Gauteng') {
            var data = (await pool.query(`select reg_num,starts_str from taxi where starts_str = $1`, ['GP'])).rows
            return data
        }
    }
    async function findTripsByRegNumber(regNum) {
        //first get the id for reg number
        var id = (await pool.query("select id from taxi where reg_num = $1", [regNum])).rows
        var actualId = id[0].id;
        var data = (await pool.query("select * from trip where taxi_id = $1", [actualId])).rows
        return data;
    }
    async function findTripsByRegion(region) {
        //first get the id for region
        var id = (await pool.query("select id from region where name_of_region  = $1", [region])).rows
        var actualId = id[0].id;
        var data = (await pool.query("select * from trip where  region_id = $1", [actualId])).rows
        return data;
    }
    async function findIncomeByRegNumber(regNum) {
        //first get the id for reg number
        var id = (await pool.query("select id from taxi where reg_num = $1", [regNum])).rows
        var actualId = id[0].id;
        var data = (await pool.query("select sum(fare) as income from trip where taxi_id = $1", [actualId])).rows
        return data;
    }
    async function findTotalIncomePerTaxi() {
        var data = (await pool.query(`select sum(fare) as income,  (select reg_num from taxi where id = taxi_id ) as regNum  from trip group by regNum`)).rows
        return data
    }
    async function findTotalIncome() {
        var data = (await pool.query(`select sum(fare) as income from trip`)).rows
        return data
    }
    return {
        totalTripCount,
        findAllRegions,
        findTaxisForRegion,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncomePerTaxi,
        findTotalIncome
    }

}