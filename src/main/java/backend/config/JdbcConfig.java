package backend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.core.convert.JdbcCustomConversions;
import org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.List;

@Configuration
public class JdbcConfig extends AbstractJdbcConfiguration {

    @Bean
    @Override
    public JdbcCustomConversions jdbcCustomConversions() {
        return new JdbcCustomConversions(List.of(
                new LocalDateTimeWriteConverter(),
                new LocalDateTimeReadConverter(),
                new PriorityWriteConverter(),
                new PriorityReadConverter(),
                new StatusWriteConverter(),
                new StatusReadConverter(),
                new TermReadConverter(),
                new TermWriteConverter()
        ));
    }
}

