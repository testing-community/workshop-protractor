import { DisplayProcessor, SpecReporter } from 'jasmine-spec-reporter';

export let reporter = () => {
  jasmine.getEnv().addReporter(new SpecReporter({
    customProcessors: [DisplayProcessor],
  }));
};
