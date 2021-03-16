package oasis.gateway.service;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.nacos.api.NacosFactory;
import com.alibaba.nacos.api.PropertyKeyConst;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.config.listener.Listener;
import com.alibaba.nacos.api.exception.NacosException;
import org.springframework.cloud.gateway.route.RouteDefinition;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Properties;
import java.util.concurrent.Executor;

@Service
public class RouteService extends AbstractDynamicRouteService {

    private static final String DATA_ID = "gateway.json";

    public void autoRefresh() throws NacosException {
        Properties properties = new Properties();
        properties.put(PropertyKeyConst.SERVER_ADDR, "114.116.234.243:8848");
        ConfigService configService = NacosFactory.createConfigService(properties);
        configService.addListener(DATA_ID, "DEFAULT_GROUP", new Listener() {
            @Override
            public Executor getExecutor() {
                return null;
            }

            @Override
            public void receiveConfigInfo(String configInfo) {
                JSONObject object = JSONObject.parseObject(configInfo);
                if (!CollectionUtils.isEmpty(object)) {
                    List<RouteDefinition> list = JSONObject.parseArray(object.get("routeList").toString(), RouteDefinition.class);
                    if (!CollectionUtils.isEmpty(list)) {
                        for (RouteDefinition definition : list) {
                            update(definition);
                        }
                    }
                }
            }
        });
    }
}
