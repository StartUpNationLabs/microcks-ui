import {ConfigApi, DefaultApi, JobApi, MetricsApi, MockApi, TestApi} from "@/api/api.ts";
import {Configuration} from "@/api/configuration.ts";


const configuration = new Configuration({
    basePath: 'http://localhost:8080/api',
})
export const mockApi = new MockApi(configuration);
export const testApi = new TestApi(configuration)
export const configApi = new ConfigApi(configuration)
export const defaultApi = new DefaultApi(configuration)
export const metricsApi = new MetricsApi(configuration)
export const jobApi = new JobApi(configuration)

