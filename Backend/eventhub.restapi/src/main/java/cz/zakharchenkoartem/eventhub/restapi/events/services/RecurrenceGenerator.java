package cz.zakharchenkoartem.eventhub.restapi.events.services;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.EventDto;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.Period;
import java.time.temporal.TemporalAmount;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class RecurrenceGenerator {

    private static final Map<Event.RecurrenceType, TemporalAmount> RECURRENCE_INTERVALS = Map.of(
            Event.RecurrenceType.weekly, Period.ofWeeks(1),
            Event.RecurrenceType.biweekly, Period.ofWeeks(2),
            Event.RecurrenceType.monthly, Period.ofMonths(1),
            Event.RecurrenceType.quarterly, Period.ofMonths(3),
            Event.RecurrenceType.yearly, Period.ofYears(1)
    );

    public List<EventDto> generateInstances(EventDto event, OffsetDateTime from, OffsetDateTime to) {
        List<EventDto> instances = new ArrayList<>();
        TemporalAmount step = RECURRENCE_INTERVALS.get(event.getRecurrence());

        if (step == null) {
            return List.of(event);
        }

        OffsetDateTime newStartTime = event.getStartTime();
        OffsetDateTime newEndTime = event.getEndTime();

        while (!newStartTime.isAfter(to) && !newStartTime.isAfter(event.getRecurrenceEndDate())) {
            if (!newStartTime.isBefore(from)) {
                instances.add(new EventDto(event, newStartTime, newEndTime));
            }

            newStartTime = newStartTime.plus(step);
            newEndTime = newEndTime.plus(step);
        }

        return instances;
    }
}
