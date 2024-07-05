const fs = require('fs');
const path = require('path');
const locations = JSON.parse(fs.readFileSync(path.join(__dirname, '../../locations.json'), 'utf8'));
const currencies = JSON.parse(fs.readFileSync(path.join(__dirname, '../../currencies.json'), 'utf8'));
const languages =JSON.parse(fs.readFileSync(path.join(__dirname, '../../languages.json'), 'utf8'));

module.exports = {
  getCountries: (req, res) => {
    try {
      const countries = locations.countries.map(country => ({ name: country.name, code: country.code }));
      res.status(200).json({ status: 200, res: countries, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  getStates: (req, res) => {
    try {
      const countryCode = req.params.countryCode;
      const country = locations.countries.find(c => c.code === countryCode);
      if (!country) {
        return res.status(404).json({ status: 404, error: 'Country not found', res: null });
      }
      const states = country.states.map(state => ({ name: state.name, code: state.code }));
      res.status(200).json({ status: 200, res: states, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  getCities: (req, res) => {
    try {
      const { countryCode, stateCode } = req.params;
      const country = locations.countries.find(c => c.code === countryCode);
      if (!country) {
        return res.status(404).json({ status: 404, error: 'Country not found', res: null });
      }
      const state = country.states.find(s => s.code === stateCode);
      if (!state) {
        return res.status(404).json({ status: 404, error: 'State not found', res: null });
      }
      res.status(200).json({ status: 200, res: state.cities, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  getAllCurrencies: (req, res) => {
    try {
      const sortedCurrencies = currencies.sort((a, b) => {
        if (a.full_name < b.full_name) {
            return -1;
        }
        if (a.full_name > b.full_name) {
            return 1;
        }
        return 0;
    });
      res.status(200).json({ status: 200, res: sortedCurrencies, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  getLanguages: (req, res) => {
    try {
      const sortedLanguages = languages.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
      res.status(200).json({ status: 200, res: sortedLanguages, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
};
